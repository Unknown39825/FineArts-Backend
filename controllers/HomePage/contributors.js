const Contributor = require("../../models/HomePage/contributor");
const User = require("../../models/User/user");

// create a contributor
exports.createContributor =async (userId,cnt)=>{
    
    try {
        const contributor = await Contributor.findOne({ user: userId });
        
        if(contributor)
        {

           await contributor.update({
                $inc:{
                    count:cnt
                }
            });
            await contributor.save();
            
        }
        else
        {

            const contributor = new Contributor({
                user:userId,
                cnt:cnt
            });
            await contributor.save();
            
        }
        
    } catch (error) {
        console.log("error");
        
    }

    // const contributor= new Contributor(req.body);
    // contributor.save((err,data)=>{
    //     if(err)
    //     return res.status(400).json({
    //         error:"Unable to save data !!",
    //         desc:err
    //     })
    //     res.json(data);
    // });
    
};

// fetch all contributors
exports.getContributors = async (req, res) => {
    try {
        const data = await Contributor.find().populate("user", "firstname").exec();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(401).json({ error: err });
    }
};

// delete contributor
exports.deleteContributor = (req, res) => {
  Contributor.findByIdAndRemove(req.params.contId)
    .then((contributor) => {
      if (!contributor) return res.status(400).json({ error: "Contributor not found !!" });
      res.status(200).json(contributor);
    })
    .catch((err) => {
      if (err) return res.status(500).json({ error: "contributor not found !!", desc: err });
    });
};
