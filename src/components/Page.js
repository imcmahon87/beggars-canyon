import React, { useState, useEffect } from 'react';
import './Page.css';
import { CSSTransition } from 'react-transition-group';
import ContentMain from './ContentMain';
import ContentShows from './ContentShows';
import ContentGallery from './ContentGallery';
import ContentContact from './ContentContact';
import './Content.css'
import fallingPerson from '../assets/images/falling-person.png';

function Page(props) {

    let pageContent;
    let headerContent;
    let headerType;
    if (props.route === 'shows') {
        pageContent = <ContentShows />;
        headerType = "page-header";
        headerContent = <h2>Upcoming Shows</h2>;
    } else if (props.route === 'gallery') {
        pageContent = <ContentGallery />;
        headerType = "page-header";
        headerContent = <h2>Media Gallery</h2>;
    } else if (props.route === 'contact') {
        pageContent = <ContentContact />;
        headerType = "page-header";
        headerContent = <h2>Contact Us</h2>;
    } else {
        pageContent = <ContentMain />
        headerType = "main-header";
        headerContent = <img id="falling-person" src={fallingPerson} alt="Falling Person" />;
    }
    

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
                className={headerType}
            >
                <div>{headerContent}</div>
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
                className="animation-content"
            >
                <div>{pageContent}</div>
            </CSSTransition>
        </div>
    );
}

export default Page;