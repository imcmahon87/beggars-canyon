import React, { useEffect, useState } from 'react';
import './Carousel.css';

let carouselImages = [];
let carouselImageOrder = [];
let sortedCarousel = [];
let carouselItems = [];

function Carousel() {
    
    const [currentItem, setCurrentItem] = useState(0);
    const [loading, setLoading] = useState(true);

    function getCarouselImages() {
        fetch('https://www.iancomposer.com:3002/getcarouselimages')
            .then(response => response.json())
            .then((data) => {
                carouselImages = data;
                fetch('https://www.iancomposer.com:3002/getcarouselimageorder')
                .then(response => response.json())
                .then((data) => {
                    carouselImageOrder = data;
                    sortedCarousel = [];
                    for (let i = 0; i < carouselImageOrder.order.length; i++) {
                        let imageId = carouselImageOrder.order[i];
                        for (let j = 0; j < carouselImages.length; j++) {
                            if (carouselImages[j].ImageId === imageId) {
                                sortedCarousel.push(carouselImages[j]);
                            }
                        }
                    }
                    carouselItems = [];
                    for (let i = 0; i < sortedCarousel.length; i++) {
                        carouselItems.push(String(i + 1));
                    }

                    setLoading(false);
                });
            })
    }

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

    getCarouselImages();

    return (
        <div id="carouselContainer">
            <div id="carousel">
                { !loading ? (
                    sortedCarousel.map((image) => {
                        return (
                            <div key={image.ImageId} className="carouselItem" style={{transform: `translate(-${currentItem * 100}%)`}}>
                                <a href={image.URL} target="_blank" rel="noreferrer" style={{height: '100%', width: 'auto'}}>
                                    <img src={'https://www.iancomposer.com/beggarscanyon/carousel/' + image.File}
                                         style={{height: '100%', width: 'auto'}}
                                         alt={image.Description}
                                    />
                                </a>
                            </div>
                        )})
                ) : <p>Loading</p>
                }
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