import axios from "axios";

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    
    localStorage.setItem("jwt", JSON.stringify(data));
    return;
  }
};

export const signout = async () => {

    const { token } = isAuthenticated();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
  if (typeof window !== "undefined") {
    // console.log(localStorage.getItem("jwt"));
    try {
        const res = await axios.get(`/user/logout`, config);
        localStorage.removeItem("jwt");
        if(res)
        window.alert(`${res.data.firstname} logout success`);
        window.location="/";

    } catch (error) {

      console.log(error);
      window.alert("session expired login again");
      localStorage.removeItem("jwt");
      window.location.reload();
      return;
      
    }

  }
};

export const isAuthenticated = () => {
  // console.log(localStorage.getItem("jwt"));
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    // console.log(localStorage.getItem("jwt"));
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
