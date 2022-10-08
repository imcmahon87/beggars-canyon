import React, { useState, useEffect } from 'react';
import './Shows.css';
import { CSSTransition } from 'react-transition-group';

function Shows() {

    let [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(()=>setShow(true), 1);
    }, [])

    return (
        <div>
            <CSSTransition in={show}
                timeout={1000}
                classNames="fade"
                unmountOnExit
                className="page-header"
            >
                <div className="page-header">
                    <h2>Upcoming Shows</h2>
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
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>
                    <p>Here are upcoming shows</p>

                </div>
            </CSSTransition>
        </div>
    );
}

export default Shows;