import { useState } from 'react';
import LoginCarousel from './LoginCarousel';
import LoginShows from './LoginShows';
import LoginGallery from './LoginGallery';

let loggedIn = true;

function Login() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [authenticated, setAuthenticated] = useState(loggedIn);
    const [content, setContent] = useState('shows');

    fetch('http://localhost:3002/checkloggedin')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response === true) {
                loggedIn = true;
                setAuthenticated(true);
            } else {
                loggedIn = false;
                setAuthenticated(false);
            }
        });

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
                fetch('http://localhost:3002/loggedin')
                    .then(data => {
                        console.log(data);
                        loggedIn = true;
                    });
            });
    }

    function logout() {
        fetch('http://localhost:3002/logout')
            .then(data => {
                loggedIn = false;
                setAuthenticated(false);
                console.log('logged out');
            });
    }

    return (
        <>
            { authenticated ? (
                <>
                    <button id="logoutButton" onClick={logout}>Logout</button>
                    <div id="loginContentHeader">
                        <div className="loginContentTab" onClick={() => setContent('shows')} >
                            <p>Shows</p>
                        </div>
                        <div className="loginContentTab" onClick={() => setContent('gallery')} >
                            <p>Gallery</p>
                        </div>
                        <div className="loginContentTab" onClick={() => setContent('carousel')} >
                            <p>Carousel</p>
                        </div>
                    </div>
                    <div id="loginContent">
                        <LoginContent content={content} />
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
                    </div>
                    </>
            }
        </>
    )
}

function LoginContent(props) {
    if (props.content === 'shows') {
        return (
            <LoginShows />
        );
    }
    if (props.content === 'gallery') {
        return (
            <LoginGallery />
        );
    }
    if (props.content === 'carousel') {
        return (
            <LoginCarousel />
        );
    }
}

export default Login;