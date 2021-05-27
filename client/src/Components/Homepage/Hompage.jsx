import React, { useEffect, useState } from 'react'
import Backdrop from '../BackDrop'
import Base from '../Base/Base'
import WhoAreWe from './WhoAreWe'
import './style.css'
import WhatWeDo from './WhatWeDo'
import ThingWeOrganise from './ThingWeOrganise'
import axios from 'axios'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Loader from '../Loader/Loader'

export default function Hompage() {

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [workshop, setWorkshop] = useState([]);
    const [events, setEvents] = useState([]);

    const FetchData = async()=>{

        try {
            const res = await axios.get('/api/event');
            if(res.data)
            {
                setEvents(res.data);
                
            }

            const res2= await axios.get('/api/workshop');
            if (res2.data) {
                setWorkshop(res2.data);
                
            }

            const res3= await axios.get('/api/homecard');
            if (res3.data) {
                setCards(res3.data);
                
            }

            setLoading(false);

        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect(() => {
        
        FetchData();
        Aos.init({duration:1000});
        
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <Base >
        <Backdrop/>
        <WhoAreWe/>
        <WhatWeDo cards={cards} />
        <ThingWeOrganise events={events} workshop={workshop} />
        </Base>
    )
}
