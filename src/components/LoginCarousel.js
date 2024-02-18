import React, { useState, useEffect } from 'react';

let carouselImageList = [];
let carouselImageData = [];
let carouselImageOrder = [];
let carouselImageOrderArray = [];
let carouselSortedImages = [];

async function getCarouselImages(callback) {
    carouselImageList = await fetch('http://localhost:3002/getcarouselimages');
    carouselImageOrder = await fetch('http://localhost:3002/getcarouselimageorder');
    carouselImageOrderArray = await carouselImageOrder.json();
    carouselImageData = await carouselImageList.json();
    carouselSortedImages = [];
    for (let i = 0; i < carouselImageOrderArray.order.length; i++) {
        let imageId = carouselImageOrderArray.order[i];
        for (let j = 0; j < carouselImageData.length; j++) {
            if (carouselImageData[j].ImageId === imageId) {
                carouselSortedImages.push(carouselImageData[j]);
            }
        }
    }
    console.log(carouselSortedImages);
    //setLoading(false);
    callback();
}

function LoginCarousel() {

    function shiftBack(image) {
        const originalIndex = carouselSortedImages.indexOf(image);
        if (originalIndex > 0) {
            let element = carouselImageOrderArray.order[originalIndex];
            carouselImageOrderArray.order.splice(originalIndex, 1);
            carouselImageOrderArray.order.splice(originalIndex - 1, 0, element);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carouselImageOrderArray)
            };
            fetch('http://localhost:3002/updatecarouselorder', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getCarouselImages(setLoading);
            });
        } else {
            console.log('cannot move first element');
        }
    }

    function shiftForward(image) {
        const originalIndex = carouselSortedImages.indexOf(image);
        if (originalIndex < carouselSortedImages.length - 1) {
            let element = carouselImageOrderArray.order[originalIndex];
            carouselImageOrderArray.order.splice(originalIndex, 1);
            carouselImageOrderArray.order.splice(originalIndex + 1, 0, element);

            console.log(carouselImageOrderArray);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carouselImageOrderArray)
            };

            fetch('http://localhost:3002/updatecarouselorder', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getCarouselImages(setLoading);
            });

        } else {
            console.log('cannot move last element');
        }
    }

    function deleteCarouselImage(image) {
        const index = carouselSortedImages.indexOf(image);
        const imageData = carouselSortedImages[index];
        console.log(imageData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageData)
        };
        fetch('http://localhost:3002/deletecarousel', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(true);
        });
    }
            

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getCarouselImages(setLoading);
        }
    }, [loading]);

    return (
        <div>
            { loading ? 'Loading' : (
                carouselSortedImages.map((image) => {
                    return (
                        <div key={image.ImageId} className="galleryImage">
                            <img src={'http://localhost:3000/beggarscanyon/carousel/' + image.File} />
                            <button onClick={() => {shiftBack(image)}}>-</button>
                            <button onClick={() => {shiftForward(image)}}>+</button>
                            <button onClick={() => {deleteCarouselImage(image)}}>Delete</button>
                        </div>
                    )
                })
                )
            }
        </div>
    );
}

export default LoginCarousel;