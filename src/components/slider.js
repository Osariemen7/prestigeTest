import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import pic2 from './images/pic2.svg';
import pic3 from './images/pic3.svg';
import pic1 from './images/pic1.svg';


const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
}

const SlidingPage =() => {
    const images = [pic1, 
        pic2,
        pic3
    ];
    return(
    <Slide {...proprietes} className="indicator" >
    <div className="each-slide-effect">
        <div >
            <img src={images[0]} alt=''/>
            <h2> Grow with low interest<br/> asset and lease financing</h2>
            <p>Start or expand your business with a<br/> guaranteed access to long term financing<br/> at 6% per annum.</p>
        </div>
    </div>
    <div className="each-slide-effect">
        <div >
            <img src={images[1]} alt=''/>
            <h2>Don't just go fast,<br/> Go far with accountability partners</h2>
            <p>Create or join a closed community of<br/>business peers and help each other<br/> stay on track to reaching your goals.</p>
        </div>
    </div>
    <div className="each-slide-effect">
        <div>
            <img src={images[2]} alt=''/>
            <h2>Get a bank account for your<br/> business in minutes</h2>
            <p>Get an NDIC insured bank account optimised<br/> for fast convenient, and reliable transaction<br/> processing</p>
        </div>
    </div>
</Slide>
    )
}
export default SlidingPage