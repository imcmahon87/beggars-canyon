import { useEffect, useState } from 'react';

let showData = [];
let performerData = [];
let appendData = [];
let displayData = [];
let noShows = 0;

async function getShows(callback) {
    showData = [];
    performerData = [];
    appendData = [];
    displayData = [];
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
    console.log(displayData);
    callback(false);
}

function LoginShows() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getShows(setLoading);
        }
    }, [loading]);

    function addShow(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newShow = {
            date: formData.get('date'),
            time: formData.get('time'),
            venue: formData.get('venue'),
            city: formData.get('city'),
            state: formData.get('state')
        }
        console.log(newShow);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: newShow.date, time: newShow.time, venue: newShow.venue,
                                    city: newShow.city, state: newShow.state })
        };
        document.getElementById('showForm').reset();
        fetch('https://www.iancomposer.com:3002/newshow', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setLoading(true);
                //getShows(setLoading);
            });
    }

    function deleteShow(showId, other) {
        if (other) {
            console.log(showId);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: showId })
            };
            fetch('https://www.iancomposer.com:3002/deleteperformer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: showId })
                    };
                    fetch('https://www.iancomposer.com:3002/deleteshow', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setLoading(true);
                        //getShows(setLoading);
                    });
                });
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: showId })
            };
            fetch('https://www.iancomposer.com:3002/deleteshow', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getShows(setLoading);
            });
        }
    }

    function addPerformer(showId, performer) {
        if (showId && performer) {
            console.log(showId, performer);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: showId, performer: performer })
            };
            fetch('https://www.iancomposer.com:3002/newperformer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    //getShows(setLoading);
            });
        }
    }


    return (
        <>
            <form id="showForm" onSubmit={addShow}>
                <h3>Add Show</h3>
                <div id="showFormTop">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" required />
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" name="time" />
                    <label htmlFor="venue">Venue</label>
                    <input type="text" id="venue" name="venue" required />
                </div>
                <div id="showFormBottom">
                    <label htmlFor="venue">City</label>
                    <input type="text" id="city" name="city" required />
                    <label htmlFor="venue">State</label>
                    <input type="text" id="state" name="state" required />
                </div>
                <button type="submit">Add show</button>
            </form>
            {loading ? (<p>Loading</p>) : (
                displayData.map((show) => {
                    return (
                        <div key={show.ShowId} className="loginShowDiv">
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
                            <div className="showDivAdmin">
                                <div className="showDivAdminPerformer">
                                    <input type="text" id={'newPerformer' + show.ShowId} name={'newPerformer' + show.ShowId} />
                                    <button onClick={() => { addPerformer(show.ShowId, 
                                                            document.getElementById('newPerformer' + show.ShowId).value) }}
                                                            >Add Performer</button>
                                </div>
                                <button onClick={() => { deleteShow(show.ShowId, show.Other); }}>Delete Show</button>
                            </div>
                        </div>
                    )
                })
            )}
            { noShows ? <div className="loginShowDiv"><p>There are no shows currently scheduled</p></div> : 
                        <></> }
        </>
    );
}

export default LoginShows;