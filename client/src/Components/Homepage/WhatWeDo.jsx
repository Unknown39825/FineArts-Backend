import React from 'react';
import Carousel from './Carousel';
import './style.css'

const WhatWeDo = ({cards}) => {
    return (
        <div className="art">

            <div className="container">
                <center className="who">
                    <h1>What We do</h1>
                </center>
                <Carousel cards={cards} /> 
                
            </div>

        </div>

    );
}

export default WhatWeDo;
