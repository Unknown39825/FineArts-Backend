import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Footer.css'

export default function Newsletter() {
    const [email, setEmail] = useState('');
    
    const submit = async(event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/newsletter',{email});
            if(res.data) {
                console.log(res.data);
            }

           toast("subscribed");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form-element">
            <form target="_blank">

                <input type="email" className="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email" />

                <button className="btn form-btn" onClick={submit} >Subscribe</button>
            </form>

        </div>
    )
}
