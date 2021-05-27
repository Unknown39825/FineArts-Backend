import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Loader from '../Loader/Loader';
import Navbar from '../NavBar/Navbar'

export default function Base({
    title=-"title",
    description="my description",
    className="",
    children
}) {

    const [loading, setLoading] = useState(true);
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

        setTimeout(() => {
            setLoading(false);
            
        }, 1000);

        FetchData();

    }, []);

    if (loading) {
        return <Loader />

    }
    
    return (
        <>
        <Navbar key="navbar"/>

        <div className={className}>
            
            {children}
            
        </div>

        <Footer key="footer" contributors ={conributor} />
        </>
    )
}
