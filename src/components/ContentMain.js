import React from 'react';
import './Content.css';
import Carousel from './Carousel';
import Footer from './Footer';
import bandPhoto from '../assets/images/band-photo.jpg';

function ContentMain() {
    return (
        <>
            <div id="content">
                <Carousel />
                <div id="mainInfo">
                    <div className="infoDiv">
                        <h3>Music is better when it is made with friends</h3>
                        <p>
                            For Beggars Canyon, music goes beyond creating mere melodies—it's 
                            about sitting in a circle with your closest buds, crafting something heartfelt. Hailing from Portland, Oregon 
                            the six-piece band takes Folk Americana in a new unconventional direction. Storytelling and group vocal harmonies 
                            blended with honest lyrics. From upbeat boot stompin' anthems to somber dark tunes. Beggars Canyon invites you 
                            to to be their friend.
                        </p>
                    </div>
                    <img src={bandPhoto} />
                </div>
                <div className="paragraphDiv">
                    <h3>Upcoming Shows</h3>
                    <p>12/1 | Bermerton, WA | The Charleston</p>
                    <p>12/2 | Portland, OR | Twilight Cafe</p>
                    <p>12/28 | Eugene, OR | John Henry's</p>
                    <p>12/29 | Bend, OR | Volcanic Theater</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContentMain;