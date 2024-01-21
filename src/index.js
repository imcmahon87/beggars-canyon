import './index.css';
import './animation.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import App from './App';
import Header from './components/Header';

// Store window dimensions so we know which images we're waiting to load
let windowWidth = window.innerWidth;

// Image/font variables to load before animation starts
let imageBackground;
let imageHillLeft;
let imageHillRight;
let imageTrees;
let imageContentTile;

// Load small images for mobile, large images for desktop
if (windowWidth > 900) {
  imageBackground = require('./assets/images/background-mobile.png');
  imageHillLeft = require('./assets/images/hill-left-desktop.png');
  imageHillRight = require('./assets/images/hill-right-desktop.png');
  imageTrees = require('./assets/images/foreground-trees-desktop.png');
  imageContentTile = require('./assets/images/foreground-tile-desktop.jpg');
} else {
  imageBackground = require('./assets/images/background-mobile.png');
  imageHillLeft = require('./assets/images/hill-left-mobile.png');
  imageHillRight = require('./assets/images/hill-right-mobile.png');
  imageTrees = require('./assets/images/foreground-trees-mobile.png');
  imageContentTile = require('./assets/images/foreground-tile-mobile.png');
}


function Index() {
  const [loadingInProgress, setLoading] = useState(true);
  const location = useLocation();

  // Preload the background images, and only then set 'loading' to false and call onLoaded()
  // (This prevents the animation from starting until the images are loaded)
  const preloadImages = [imageBackground, imageHillLeft, imageHillRight, imageTrees, imageContentTile];
  let imageCounter = 0;
  for (let i = 0; i < preloadImages.length; i++) {
    let image = new Image();
    image.src = preloadImages[i];
    image.addEventListener('load', () => {
      imageCounter += 1;
      if (imageCounter >= preloadImages.length) {
        setLoading(false);
        onLoaded();
      }
    });
  };

  function onLoaded() {
    // Minimize mobile menu when clicking outside of menu
    let menuArea = document.getElementById('headerMobile');
    let mouseMenuArea;
    menuArea.addEventListener('mouseover', () => {
        mouseMenuArea = true;
    });
    menuArea.addEventListener('mouseleave', () => {
        mouseMenuArea = false;
    });
    document.addEventListener('click', () => {
        if (mouseMenuArea === false) {
            document.getElementById('menuMobile').style.display = 'none';
        }
    });
      
    // Scroll to top when clicking a link (for animation purposes)
    const menuLinks = document.getElementsByClassName('anim-link');
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', () => {
        document.getElementById('menuMobile').style.display = 'none';
        window.scrollTo(0, 0);
      });
    }
  }

  return (
    <div id="wrapper">
      {loadingInProgress ? (
        <div className="loader-container">
          <ClipLoader color={'#fff'} size={150} />
        </div>
      ) : (
        <div className="main-content">
          <Header />
          <SwitchTransition>
            <CSSTransition key={location.key} classNames="slide" timeout={500}>
              <Routes location={location}>
                <Route path="/" element={<App route="main"/>} />
                <Route path="/releases" element={<App route="releases"/>} />
                <Route path="/gallery" element={<App route="gallery" />} />
                <Route path="/contact" element={<App route="contact" />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
    </div>
  );
}

const Root = () => <BrowserRouter basename={'beggarscanyon'}><Index /></BrowserRouter>;
render(<Root />, document.getElementById('root'));