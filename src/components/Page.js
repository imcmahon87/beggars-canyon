import React, { useState, useEffect } from 'react';
import './Page.css';
import { CSSTransition } from 'react-transition-group';
import ContentMain from './ContentMain';
import './Content.css'

function Page() {

    let [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(()=>setShow(true), 1);
    }, [])

    return (
        <div id="page">
            <CSSTransition in={show}
                timeout={1000}
                classNames="fade"
                unmountOnExit
                className="page-header"
            >
                <div className="page-header">
                    <h2>Testing Page</h2>
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
                <div class="test"><p>Test</p></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={1500}
                classNames="slide-content"
                unmountOnExit
                className="content"
            >
            </CSSTransition>
            <ContentMain id="Content"/>
        </div>
    );
}

export default Page;