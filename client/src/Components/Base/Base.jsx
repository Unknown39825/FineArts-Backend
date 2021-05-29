import Aos from 'aos';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'

import Navbar from '../NavBar/Navbar'

export default function Base({
    title="title",
    description="my description",
    className="",
    children
}) {

    const [conributor, setConributor] = useState([]);

    const FetchData = async () => {

        try {
            const res = await axios.get('/api/contributor');
            if (res.data) {
                setConributor(res.data);
                
            }

        } catch (error) {
            console.log(error);

        }

    }
   
    useEffect(() => {

        FetchData();
        
        Aos.init();
       
    }, []);

    return (
        <div >
        <Navbar key="navbar"/>

            <div className="children" >
                {children}
            </div>
            
        <Footer key="footer" contributors ={conributor} />
        </div>
    )
}
