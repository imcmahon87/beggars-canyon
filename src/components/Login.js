import { useState, useEffect } from 'react';

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
    const showResponse = await fetch('http://localhost:3002/getShows');
    const performerResponse = await fetch('http://localhost:3002/getPerformers');
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

function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getShows(setLoading);
        }
    }, [loading, displayData]);

    function handleSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, password: user.password })
        };
        fetch('http://localhost:3002/login', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'good') {
                    setAuthenticated(true);
                }
            });
    }

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
        fetch('http://localhost:3002/newshow', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setLoading(true);
                getShows(setLoading);
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
            fetch('http://localhost:3002/deleteperformer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: showId })
                    };
                    fetch('http://localhost:3002/deleteshow', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setLoading(true);
                        getShows(setLoading);
                    });
                });
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: showId })
            };
            fetch('http://localhost:3002/deleteshow', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    getShows(setLoading);
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
            fetch('http://localhost:3002/newperformer', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLoading(true);
                    getShows(setLoading);
            });
        }
    }

    function imageSubmit(e) {
        e.preventDefault();
        /*const formData = new FormData(e.currentTarget);

        const imageData = {
            description: formData.get('description'),
            image: formData.get('image')
        }
        console.log(imageData);*/
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
            /*headers: { 'Content-Type': 'application/json' },*/
            /*headers: {
                'Content-Type': 'multipart/form-data'
            }*/
        })
        .then((res) => console.log(res))
        .catch((err) => ('Error: ' + err));
    }

    return (
        <>
            { authenticated ? (
                <>
                    <form id="showForm" onSubmit={addShow}>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" required />
                        <label htmlFor="time">Time</label>
                        <input type="time" id="time" name="time" />
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id="venue" name="venue" required />
                        <label htmlFor="venue">City</label>
                        <input type="text" id="city" name="city" required />
                        <label htmlFor="venue">State</label>
                        <input type="text" id="state" name="state" required />
                        <button type="submit">Add show</button>
                    </form>
                    <div>
                    {loading ? (<p>Loading</p>) : (
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
                                    <button onClick={() => { deleteShow(show.ShowId, show.Other); }}>Delete Show</button>
                                    <input type="text" id={'newPerformer' + show.ShowId} name={'newPerformer' + show.ShowId} />
                                    <button onClick={() => { addPerformer(show.ShowId, 
                                                            document.getElementById('newPerformer' + show.ShowId).value) }}
                                                            >Add Performer</button>
                                </div>
                            )
                        })
                    )}
                    { noShows ? <div className="showDiv"><p>There are no shows currently scheduled</p></div> : 
                                <></> }
                    </div>
                </>
                ) : <>
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={(e) => setUser({...user, username: e.target.value})} />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setUser({...user, password: e.target.value})}  />
                        <button type="submit">Submit</button>
                        </form>
                        <div>
                            <form id="imageForm" onSubmit={imageSubmit} >
                                <label htmlFor="Image Description">Image Description</label>
                                <input type="text" id="description" name="description" />
                                <input id="files" name="files" type="file" multiple />
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                    </>
            }
        </>
    )
}

export default Login;