import React, { useState, useEffect } from 'react';
import './Main.css';
import { CSSTransition } from 'react-transition-group';

function Main() {

    let [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(()=>setShow(true), 1);
    }, [])

    return (
        <div id="main">
            <CSSTransition in={show}
                timeout={1000}
                classNames="fade"
                unmountOnExit
                className="page-header"
            >
                <div className="page-header">
                    <h2>Landing Page</h2>
                </div>
            </CSSTransition>

            <CSSTransition in={show}
                timeout={1500}
                classNames="slide-left"
                unmountOnExit
                className="animation-left"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={1500}
                classNames="slide-right"
                unmountOnExit
                className="animation-right"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={1500}
                classNames="slide-center"
                unmountOnExit
                className="animation-center"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={1500}
                classNames="slide-content"
                unmountOnExit
                className="content"
            >
                <div>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>
                    <p>This is the main landing site</p>

                </div>
            </CSSTransition>
        </div>
    );
}

export default Main;