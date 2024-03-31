import React, { useState, useEffect } from 'react';

let imageList = [];
let imageData = [];
let imageOrder = [];
let imageOrderArray = [];
let sortedImages = [];
let galleryHeight = 0;

async function getImages(callback) {
    console.log('getting images');
    imageList = await fetch('http://localhost:3002/getimages');
    imageOrder = await fetch('http://localhost:3002/getimageorder');
    imageOrderArray = await imageOrder.json();
    //if (imageData.length === 0) {
        imageData = await imageList.json();
    //}
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
    callback(false);
}

function LoginGallery() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getImages(setLoading);
        }
    }, [loading]);

    function imageSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('description');
        const files = document.getElementById('files');
        const formData = new FormData();
        formData.append('description', name.value);
        for(let i =0; i < files.files.length; i++) {
            formData.append('files', files.files[i]);
        }
        console.log(formData);
        fetch('http://localhost:3002/uploadimage', {
            method: 'POST',
            body: formData,
        })
        .then((res) => {
            console.log(res);
            //getImages(setLoading);
            setLoading(true);
        })
        .catch((err) => ('Error: ' + err));
    }

    function shiftBack(image) {
        // Make image gallery wrapper stay the same height while loading so the view doesn't jump up to the top
        const wrapper = document.getElementById('loginImageGallery');
        galleryHeight = wrapper.offsetHeight;
        wrapper.style.minHeight = galleryHeight + 'px';

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
            });
        } else {
            console.log('cannot move first element');
        }
    }

    function shiftForward(image) {
        // Make image gallery wrapper stay the same height while loading so the view doesn't jump up to the top
        const wrapper = document.getElementById('loginImageGallery');
        galleryHeight = wrapper.offsetHeight;
        wrapper.style.minHeight = galleryHeight + 'px';

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

    return (
        <div>
            <form id="imageForm" onSubmit={imageSubmit} >
                <h3>Add Image</h3>
                <label htmlFor="Image Description">Image Description</label>
                <input type="text" id="description" name="description" />
                <input id="files" name="files" type="file" multiple />
                <button type="submit">Upload</button>
            </form>
            <div id="loginImageGallery">
                { loading ? 'Loading' : (
                    sortedImages.map((image) => {
                        return (
                            <div key={image.ImageId} className="loginGalleryImage">
                                <img src={'http://localhost:3000/beggarscanyon/gallery/' + image.File}
                                     alt={image.Description}
                                />
                                <div className="loginGalleryImageBottom">
                                    <button onClick={() => {shiftBack(image)}}>-</button>
                                    <button onClick={() => {shiftForward(image)}}>+</button>
                                    <button className="deleteButton" onClick={() => {deleteImage(image)}}>Delete</button>
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

export default LoginGallery;