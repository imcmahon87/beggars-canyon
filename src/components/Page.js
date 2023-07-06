import './App.css';
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContentMain from './ContentMain';
import ContentShows from './ContentShows';
import ContentGallery from './ContentGallery';
import ContentContact from './ContentContact';

function App(props) {
    // Pass a header name and page content into the title/content components
    let headerContent;
    let pageContent;
    if (props.route === 'shows') {
        pageContent = <ContentShows />;
        headerContent = <h1>upcoming shows</h1>;
    } else if (props.route === 'gallery') {
        pageContent = <ContentGallery />;
        headerContent = <h1>media gallery</h1>;
    } else if (props.route === 'contact') {
        pageContent = <ContentContact />;
        headerContent = <h1>contact us</h1>;
    } else {
        pageContent = <ContentMain />
        headerContent = <h1>beggars canyon</h1>;
    }
    
    let [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(()=>setShow(true), 1);
    }, [])

    return (
        <div id="page">
            <div className="pageTitle">{headerContent}</div>
            <CSSTransition in={show}
                timeout={750}
                classNames="slide-left"
                unmountOnExit
                className="animationLeft"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={750}
                classNames="slide-right"
                unmountOnExit
                className="animationRight"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={750}
                classNames="slide-center"
                unmountOnExit
                className="animationCenter"
            >
                <div></div>
            </CSSTransition>
            <CSSTransition in={show}
                timeout={750}
                classNames="slide-content"
                unmountOnExit
                className="animationContent"
            >
                <div>{pageContent}</div>
            </CSSTransition>
        </div>
    );
}

export default App;