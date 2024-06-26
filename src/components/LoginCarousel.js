import React, { useState, useEffect } from 'react';

let carouselImageList = [];
let carouselImageData = [];
let carouselImageOrder = [];
let carouselImageOrderArray = [];
let carouselSortedImages = [];

async function getCarouselImages(callback) {
    carouselImageList = await fetch('https://www.iancomposer.com:3002/getcarouselimages');
    carouselImageOrder = await fetch('https://www.iancomposer.com:3002/getcarouselimageorder');
    carouselImageOrderArray = await carouselImageOrder.json();
    //if (carouselImageData.length === 0) {
        carouselImageData = await carouselImageList.json();
    //}
    carouselSortedImages = [];
    for (let i = 0; i < carouselImageOrderArray.order.length; i++) {
        let imageId = carouselImageOrderArray.order[i];
        for (let j = 0; j < carouselImageData.length; j++) {
            if (carouselImageData[j].ImageId === imageId) {
                carouselSortedImages.push(carouselImageData[j]);
            }
        }
    }
    //setLoading(false);
    callback(false);
}

function LoginCarousel() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getCarouselImages(setLoading);
        }
    }, [loading]);

    function carouselSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('carouseldescription');
        const files = document.getElementById('carouselfiles');
        const url = document.getElementById('carouselurl');
        const formData = new FormData();
        formData.append('carouseldescription', name.value);
        formData.append('carouselurl', url.value);
        for(let i =0; i < files.files.length; i++) {
            formData.append('carouselfiles', files.files[i]);
        }
        fetch('https://www.iancomposer.com:3002/uploadcarousel', {
            method: 'POST',
            body: formData,
        })
        .then((res) => {
            setLoading(true);
        })
        .catch((err) => ('Error: ' + err));
    }

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
            fetch('https://www.iancomposer.com:3002/updatecarouselorder', requestOptions)
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
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carouselImageOrderArray)
            };

            fetch('https://www.iancomposer.com:3002/updatecarouselorder', requestOptions)
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageData)
        };
        fetch('https://www.iancomposer.com:3002/deletecarousel', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(true);
        });
    }

    return (
        <div>
            <form id="imageForm" onSubmit={carouselSubmit} >
                <h3>Add Slide</h3>
                <label htmlFor="carouseldescription">Carousel Image Description</label>
                <input type="text" id="carouseldescription" name="carouseldescription" required />
                <label htmlFor="carouselurl">Carousel URL</label>
                <input type="text" id="carouselurl" name="carouselurl" required />
                <input id="carouselfiles" name="carouselfiles" type="file" multiple required />
                <button type="submit">Upload</button>
            </form>
            <div id="loginImageCarousel">
                { loading ? 'Loading' : (
                    carouselSortedImages.map((image) => {
                        return (
                            <div key={image.ImageId} className="loginCarouselImage">
                                <img src={'https://www.iancomposer.com/beggarscanyon/carousel/' + image.File}
                                     alt={image.Description}
                                />
                                <p>{image.URL}</p>
                                <div className="loginCarouselImageBottom">
                                    <button onClick={() => {shiftBack(image)}}>-</button>
                                    <button onClick={() => {shiftForward(image)}}>+</button>
                                    <button className="deleteButton" onClick={() => {deleteCarouselImage(image)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    )
                }
            </div>
        </div>
    );
}

export default LoginCarousel;