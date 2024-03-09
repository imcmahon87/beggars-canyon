import { useState, useEffect } from 'react';
import Footer from './Footer'

let imageList = [];
let imageData = [];
let imageOrder = [];
let imageOrderArray = [];
let sortedImages = [];

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

function ContentGallery() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getImages(setLoading);
        }
    });

    function selectImage(src) {
        let wrapper = document.getElementById('selectedImageContainer');
        let image = document.getElementById('largeImage');
        image.src = src;
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
    }

    return (
        <>
            <div id="content">
                <div id="imageGallery">
                    { loading ? 'Loading' : (
                        sortedImages.map((image) => {
                            return (
                                <div key={image.ImageId} className="galleryImage">
                                    <img src={'http://localhost:3000/beggarscanyon/gallery/' + image.File} 
                                        onClick={() => {selectImage('http://localhost:3000/beggarscanyon/gallery/' + image.File);}} />
                                </div>
                            )
                        })
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContentGallery;