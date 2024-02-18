import React, { useEffect, useState } from 'react';
import './Carousel.css';
import testPic from '../assets/images/test-pic.jpg';
import testPic2 from '../assets/images/new-album.jpg';

let carouselData = [];
let carouselImages = [];
let carouselImageOrder = [];
let carouselOrderArray = [];
let sortedCarousel = [];
let carouselItems = [];

function Carousel() {
    
    const [currentItem, setCurrentItem] = useState(0);
    const [loading, setLoading] = useState(true);

    function getCarouselImages() {
        fetch('http://localhost:3002/getcarouselimages')
            .then(response => response.json())
            .then((data) => {
                carouselImages = data;
                console.log('carouselImages');
                console.log(carouselImages);
                fetch('http://localhost:3002/getcarouselimageorder')
                .then(response => response.json())
                .then((data) => {
                    carouselImageOrder = data;
                    console.log('carouselImageOrder:');
                    console.log(carouselImageOrder);

                    sortedCarousel = [];
                    for (let i = 0; i < carouselImageOrder.order.length; i++) {
                        let imageId = carouselImageOrder.order[i];
                        for (let j = 0; j < carouselImages.length; j++) {
                            if (carouselImages[j].ImageId === imageId) {
                                sortedCarousel.push(carouselImages[j]);
                            }
                        }
                    }
                    console.log('sortedCarousel:');
                    console.log(sortedCarousel);

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
                                <img src={'http://localhost:3000/beggarscanyon/carousel/' + image.File} style={{height: '100%', width: 'auto'}} />
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