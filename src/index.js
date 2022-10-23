import './index.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import menuButton from './assets/images/menu-button-mobile.png';
import Page from './components/Page';

function App() {
  const location = useLocation();

  // Handle mobile menu accordion
  function mobileMenuPress() {
    var x = document.getElementById('menu-mobile');
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
  }

  // Minimize mobile menu when clicking outside of menu
  window.onload = () => {
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
  };

  return (
    <div className="wrapper">
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
  );
}

const Root = () => <BrowserRouter><App /></BrowserRouter>;
render(<Root />, document.getElementById('root'));