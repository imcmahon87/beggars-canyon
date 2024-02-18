import React, { useState, useEffect } from 'react';
import './Content.css';

let imageList = [];
let imageData = [];
let imageOrder = [];
let imageOrderArray = [];
let sortedImages = [];

async function getImages(callback) {
    imageList = await fetch('http://localhost:3002/getimages');
    imageOrder = await fetch('http://localhost:3002/getimageorder');
    imageOrderArray = await imageOrder.json();
    imageData = await imageList.json();
    sortedImages = [];
    for (let i = 0; i < imageOrderArray.order.length; i++) {
        let imageId = imageOrderArray.order[i];
        for (let j = 0; j < imageData.length; j++) {
            if (imageData[j].ImageId === imageId) {
                sortedImages.push(imageData[j]);
            }
        }
    }
    console.log(sortedImages);
    //setLoading(false);
    callback();
}

function ContentGallery() {

    function shiftBack(image) {
        const originalIndex = sortedImages.indexOf(image);
        if (originalIndex > 0) {
            let element = imageOrderArray.order[originalIndex];
            imageOrderArray.order.splice(originalIndex, 1);
            imageOrderArray.order.splice(originalIndex - 1, 0, element);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imageOrderArray)
            };
            fetch('http://localhost:3002/updateimageorder', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getImages(setLoading);
            });
        } else {
            console.log('cannot move first element');
        }
    }

    function shiftForward(image) {
        const originalIndex = sortedImages.indexOf(image);
        if (originalIndex < sortedImages.length - 1) {
            let element = imageOrderArray.order[originalIndex];
            imageOrderArray.order.splice(originalIndex, 1);
            imageOrderArray.order.splice(originalIndex + 1, 0, element);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imageOrderArray)
            };
            fetch('http://localhost:3002/updateimageorder', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getImages(setLoading);
            });

        } else {
            console.log('cannot move last element');
        }
    }

    function deleteImage(image) {
        const index = sortedImages.indexOf(image);
        const imageData = sortedImages[index];
        console.log(imageData);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageData)
        };
        fetch('http://localhost:3002/deleteimage', requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(true);
        });
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getImages(setLoading);
        }
    }, [loading]);

    return (
        <div id="content">
            { loading ? 'Loading' : (
                sortedImages.map((image) => {
                    return (
                        <div key={image.ImageId} className="galleryImage">
                            <img src={'http://localhost:3000/beggarscanyon/gallery/' + image.File} />
                            <button onClick={() => {shiftBack(image)}}>-</button>
                            <button onClick={() => {shiftForward(image)}}>+</button>
                            <button onClick={() => {deleteImage(image)}}>Delete</button>
                        </div>
                    )
                })
                )
            }
        </div>
    );
}

export default ContentGallery;