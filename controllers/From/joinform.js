const Form = require("../../models/Form/form");

exports.createFrom = (req, res) => {
    
  const form = new Form(req.body);
 form.save((err, data) => {
    if (err)
      return res.status(400).json({
        error: "Unable to save the Form!!",
        desc: err,
      });

    res.json(data);
  });
};