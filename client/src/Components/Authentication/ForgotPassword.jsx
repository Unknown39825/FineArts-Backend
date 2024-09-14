
import axios from 'axios';
import React, {  useState } from 'react'
import './style.css'
import { Navigate } from 'react-router-dom';

import Base from '../Base/Base';
import { toast } from 'react-toastify';
// import {BASE} from "../config.json";
export default function Signin() 
{
    const [userpost, setUser] = useState({
        email:'',
        password:'',
        otp:''
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    
    const handleChange = (e) => {
        setUser({
            ...userpost,
            [e.target.name]: e.target.value
        })
    }

    const changePassword =async() => {
            if(!userpost.otp || userpost.otp.trim()==="") {
                toast("add a valid otp");
                return;
            }

             try{
            const res= await axios.put(`/user/otp/verify`,userpost);

            if(res.data.error) {
                toast(res.data.error);
                return;
            }

            toast(res.data.msg);
            
            setCreated(true);
        }catch(err){
            console.log(err)
            toast("Invalid Credentials");
            return ;
        }
    }
    
    const onSubmit =(e) => {
        e.preventDefault();
        if(userpost.email.trim() !== "" && userpost.password.trim!=="" ) {
            changePassword();
        } else {
            toast("User details are  empty");
        }
    }

    const ResetPassword = async (e) => {
        if(userpost.email.trim() !== "") {
            try {
                const res= await axios.put(`/user/forgot`,userpost);

                if(res.data.error) {
                    toast(res.data.error);
                    return;
                }

                toast(res.data.msg);
            } catch (error) {
                console.log(error);
            }
        } else {
            toast("User details are  empty");
        }
    }

    if(created) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <Base>
            <div className="cont">
                <div className="main">
                    <h1 className="bg-dark m-2 text-white p-2 rounded">Reset password</h1>
                    <div className="form">
                        <form >

                            <div controlId="">
                                <label><b>email </b></label>
                                <input className="input" type="email" name="email" value={userpost.email} onChange={handleChange} placeholder="" />
                            </div>

                            <div controlId="">
                                <label><b> { "new"}  password </b></label>
                                <input className="input" type="password" name="password" value={userpost.password} onChange={handleChange} placeholder="" />
                            </div>

                            { <div controlId="">
                                <label><b>OTP</b></label>
                                <input className="input" type="password" name="otp" value={userpost.otp} onChange={handleChange} placeholder="" />
                            </div>}

                            <button variant="primary" className="btn" onClick={onSubmit}>Submit</button>

                            { <button variant="primary" className="btn" onClick={ResetPassword}>ForgotPassword</button>}

                        </form>
                    </div>
                </div>
            </div>
        </Base>
    )
}
