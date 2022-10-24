import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';
import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import menuButton from './assets/images/menu-button-mobile.png';
import Page from './components/Page';
import myBackground1 from './assets/images/background-mobile.png';
import myBackground2 from './assets/images/hill-left-mobile.png';
import myBackground3 from './assets/images/hill-right-mobile.png';
import testPic from './assets/images/test-picture.png';
import myBackground4 from './assets/images/foreground-trees-mobile.png';
import myBackground5 from './assets/images/foreground-tile-mobile.png';

function App() {
  const [loadingInProgress, setLoading] = useState(true);
  const location = useLocation();

  console.log('what about here');
  // Handle mobile menu accordion
  function mobileMenuPress() {
    var x = document.getElementById('menu-mobile');
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
  }

  function onLoaded() {
    // Minimize mobile menu when clicking outside of menu
    let menuArea = document.getElementById('header-mobile');
    let mouseMenuArea;
    menuArea.addEventListener('mouseover', () => {
        mouseMenuArea = true;
    });
    menuArea.addEventListener('mouseleave', () => {
        mouseMenuArea = false;
    });
    document.addEventListener('click', () => {
        if (mouseMenuArea === false) {
            document.getElementById('menu-mobile').style.display = 'none';
        }
    });
      
    // Scroll to top when clicking a link (for animation purposes)
    const menuLinks = document.getElementsByClassName('anim-link');
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', () => {
        document.getElementById('menu-mobile').style.display = 'none';
        window.scrollTo(0, 0);
      });
    }
  }

  // Preload the background images, and only then set 'loading' to false and call onLoaded()
  const preloadImages = [myBackground1, myBackground2, testPic, myBackground3, myBackground4, myBackground5];
  let imageCounter = 0;
  console.log('we are here');
  for (let i = 0; i < preloadImages.length; i++) {
    let image = new Image();
    image.src = preloadImages[i];
    console.log('before ' + i);
    image.addEventListener('load', () => {
      console.log('Image ' + i + ' loaded: ' + image.src);
      imageCounter += 1;
      if (imageCounter >= 6) {
        setLoading(false);
        onLoaded();
      }
    });
  };

  return (
    <div id="wrapper">
      {loadingInProgress ? (
        <div className="loader-container">
          <ClipLoader color={'#fff'} size={150} />
        </div>
      ) : (
        <div className="main-content">
          <div id="header-mobile">
            <Link to="/" className="anim-link" style={{ display: 'inline-block' }}>
              <h1>BEGGARS CANYON</h1>
            </Link>
            <div id="menu-mobile">
              <Link to="/shows" className="anim-link">Upcoming Shows</Link>
              <Link to="/gallery" className="anim-link">Gallery</Link>
              <Link to="/contact" className="anim-link">Contact</Link>
            </div>
            <img  id="menu-button-mobile"
                  src={menuButton}
                  onClick={mobileMenuPress}
                  alt="Mobile Menu Button" />
          </div>
          <script>
          </script>
          <SwitchTransition>
            <CSSTransition key={location.key} classNames="slide" timeout={1000}>
              <Routes location={location}>
                <Route path="/" element={<Page route="main"/>} />
                <Route path="/shows" element={<Page route="shows"/>} />
                <Route path="/gallery" element={<Page route="gallery" />} />
                <Route path="/contact" element={<Page route="contact" />} />
              </Routes>
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
    </div>
  );
}

const Root = () => <BrowserRouter><App /></BrowserRouter>;
render(<Root />, document.getElementById('root'));