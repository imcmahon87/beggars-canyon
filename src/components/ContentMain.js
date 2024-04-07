import React, { useState, useEffect } from 'react';
import './Content.css';
import Carousel from './Carousel';
import Footer from './Footer';
import bandPhoto from '../assets/images/band-photo.jpg';
import flailLogo from '../assets/images/flail-records.png';

let showData = [];
let performerData = [];
let appendData = [];
let displayData = [];
let noShows = 0;

async function getShows(callback) {
    const showResponse = await fetch('https://www.iancomposer.com:3002/getShows');
    const performerResponse = await fetch('https://www.iancomposer.com:3002/getPerformers');
    showData = await showResponse.json();
    performerData = await performerResponse.json();
    if (showData.length < 1) {
        noShows = 1;
    } else {
        noShows = 0;
    }
    for (let i = 0; i < showData.length; i++) {
        displayData[i] = showData[i];
        displayData[i].Other = 'w/ ';
        appendData = [];
        for (let j = 0; j < performerData.length; j++) {
            if (performerData[j].ShowId === displayData[i].ShowId) {
                appendData.push(performerData[j].Name);
            }
        }
        if (appendData.length > 0) {
            for (let j = 0; j < appendData.length; j++) {
                displayData[i].Other += appendData[j]
                if (j < appendData.length - 1) {
                    displayData[i].Other += ', ';
                }
            }
        } else {
            displayData[i].Other = ''
        }

    }

    callback();
}

function ContentMain() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getShows(setLoading);
        }
    }, [loading]);

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
                    <div className="photoDiv">
                        <img src={bandPhoto} alt="Band Members" />
                    </div>
                </div>
                <div className="pageHeader">
                    <h2>Upcoming Shows</h2>
                </div>
                { loading ? 'Loading' : (
                    displayData.map((show) => {
                        return (
                            <div key={show.ShowId} className="showDiv">
                                <div className="showDivMain">
                                    <span>
                                        <p>{show.Date}</p>
                                    </span>
                                    <span>
                                        <p style={{'fontWeight': '700'}}>{show.Venue} @ {show.Time ? show.Time : 'Showtime TBA'}</p>
                                    </span>
                                    <span>
                                        <p>{show.City}, {show.State}</p>
                                    </span>
                                </div>
                                <div className="showDivWith">
                                    <p>{show.Other}</p>
                                </div>
                            </div>
                        )
                    })
                )
                }
                { noShows ? <div className="showDiv"><p>There are no shows currently scheduled, but please check back soon!</p></div> : 
                            <></> }
                <div id="flailDiv">
                    <a href="https://flailrecords.com/" target="_blank" rel="noreferrer" >
                        <img id="flailLogo" src={flailLogo} alt="Flail Logo"/>
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContentMain;