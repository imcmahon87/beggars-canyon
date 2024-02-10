import { useState, useEffect } from 'react';

let showData = [];
let performerData = [];
let appendData = [];
let displayData = [];
let noShows = 0;

async function getShows(callback) {
    const showResponse = await fetch('http://localhost:3002/getShows');
    const performerResponse = await fetch('http://localhost:3002/getPerformers');
    showData = await showResponse.json();
    performerData = await performerResponse.json();
    if (showData.length < 1) {
        noShows = 1;
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

    const [newShow, setNewShow] = useState({
        date: '',
        time: '',
        venue: '',
        city: '',
        state: ''
    });

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            getShows(setLoading);
        }
    }, [loading]);

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
        console.log(newShow);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: newShow.date, time: newShow.time, venue: newShow.venue,
                                    city: newShow.city, state: newShow.state })
        };
        fetch('http://localhost:3002/newshow', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => setUser({...user, username: e.target.value})} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setUser({...user, password: e.target.value})}  />
                <button type="submit">Submit</button>
            </form>
            { authenticated ? (
                <>
                    <form onSubmit={addShow}>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" onChange={(e) => setNewShow({...newShow, date: e.target.value})} />
                        <label htmlFor="time">Time</label>
                        <input type="time" id="time" onChange={(e) => setNewShow({...newShow, time: e.target.value})} />
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id="venue" onChange={(e) => setNewShow({...newShow, venue: e.target.value})} />
                        <label htmlFor="venue">City</label>
                        <input type="text" id="city" onChange={(e) => setNewShow({...newShow, city: e.target.value})} />
                        <label htmlFor="venue">State</label>
                        <input type="text" id="state" onChange={(e) => setNewShow({...newShow, state: e.target.value})} />
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
                                            <p style={{'fontWeight': '700'}}>{show.Venue} @ {show.Time}</p>
                                        </span>
                                        <span>
                                            <p>{show.City}, {show.State}</p>
                                        </span>
                                    </div>
                                    <div className="showDivWith">
                                        <p>{show.Other}</p>
                                    </div>
                                    <button>Delete Show</button>
                                </div>
                            )
                        })
                    )}
                    </div>
                </>
                ) : <p>Not Authenticated</p>
            }
        </>
    )
}

export default Login;