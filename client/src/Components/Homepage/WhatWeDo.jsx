import React from 'react';

import Carousel from './Carousel';

const WhatWeDo = ({cards}) => {
    return (
        <div className="art">

            <div className="container">
                <center>
                    <h1 className="what">What We do</h1>
                </center>
                <Carousel cards={cards} /> 
                
            </div>

        </div>

    );
}

export default WhatWeDo;
