import React, { useEffect, useState } from 'react';
import './Carousel.css';
import testPic from '../assets/images/test-pic.jpg';
import testPic2 from '../assets/images/new-album.jpg';

function Carousel() {
    const carouselItems = ['1', '2', '3'];
    const [currentItem, setCurrentItem] = useState(0);

    const carouselScroll = () => {
        if (currentItem === carouselItems.length - 1) {
            return setCurrentItem(0);
        }
        return setCurrentItem(currentItem + 1);
    }

    useEffect(() => {
        const interval = setInterval(() => { carouselScroll(); }, 4500)
        return () => clearInterval(interval);
    });

    return (
        <div id="carouselContainer">
            <div id="carousel">
                    <div className="carouselItem" style={{transform: `translate(-${currentItem * 100}%)`}}>
                        <img src={testPic2} style={{height: '100%', width: 'auto'}} />
                    </div>
                    <div className="carouselItem" style={{transform: `translate(-${currentItem * 100}%)`}}>
                        <h1>Test</h1>
                    </div>
                    <div className="carouselItem" style={{transform: `translate(-${currentItem * 100}%)`}}>
                        <img src={testPic} style={{width: '100%', height: 'auto'}} />
                    </div>
            </div>
            <div id="carouselDots">
                { carouselItems.map((item, index) => {
                    return <span className="carouselDot"
                                onClick={() => { setCurrentItem(index); }}
                                key={index}
                                style={(index === currentItem) ? {backgroundColor: "#FFFFFF"} : {backgroundColor: "#A6A6A6"}}></span> })
                }
            </div>
        </div>

    );
}

export default Carousel;