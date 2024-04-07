import './Login.css';
import { useState, useEffect } from 'react';
import LoginCarousel from './LoginCarousel';
import LoginShows from './LoginShows';
import LoginGallery from './LoginGallery';
import Footer from './Footer';

let loggedIn = true;

function Login() {

    const [authenticated, setAuthenticated] = useState(loggedIn);
    const [content, setContent] = useState('shows');

    useEffect(() => {
        if (authenticated) {
            if (content === 'shows') {
                let tab = document.getElementById('tabShows');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                tab = document.getElementById('tabGallery');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                tab = document.getElementById('tabCarousel');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            } else if (content === 'gallery') {
                let tab = document.getElementById('tabShows');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                tab = document.getElementById('tabGallery');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                tab = document.getElementById('tabCarousel');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            } else {
                let tab = document.getElementById('tabShows');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                tab = document.getElementById('tabGallery');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                tab = document.getElementById('tabCarousel');
                tab.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            }
        }
    });

    fetch('https://www.iancomposer.com:3002/checkloggedin')
        .then(response => response.json())
        .then(response => {
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
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value })
        };
        fetch('https://www.iancomposer.com:3002/login', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'good') {
                    setAuthenticated(true);
                } else {
                    document.getElementById('loginError').style.display = 'block';
                }
                fetch('https://www.iancomposer.com:3002/loggedin')
                    .then(data => {
                        loggedIn = true;
                    });
            });
    }

    function logout() {
        fetch('https://www.iancomposer.com:3002/logout')
            .then(data => {
                loggedIn = false;
                setAuthenticated(false);
            });
    }

    return (
        <>
            { authenticated ? (
                <div id="loginWrapper">
                    <button id="logoutButton" onClick={logout}>Logout</button>
                    <div id="loginContentHeader">
                        <div id="tabShows" className="loginContentTab" onClick={() => setContent('shows')} >
                            <p>Shows</p>
                        </div>
                        <div id="tabGallery" className="loginContentTab" onClick={() => setContent('gallery')} >
                            <p>Gallery</p>
                        </div>
                        <div id="tabCarousel" className="loginContentTab" onClick={() => setContent('carousel')} >
                            <p>Carousel</p>
                        </div>
                    </div>
                    <div id="loginContent">
                        <LoginContent content={content} />
                    </div>
                </div>
                ) : <div id="loginWrapper">
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                            <p id="loginError">Username or password incorrect, please try again</p>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
            }
            <Footer />
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