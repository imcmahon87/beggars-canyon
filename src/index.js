import './index.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import menuButton from './assets/images/menu-button-mobile.png';
import Main from './components/Main';
import Shows from './components/Shows';

function App() {
  const location = useLocation();

  function mobileMenuPress() {
    var x = document.getElementById('menu-mobile');
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
  }

  return (
    <div className="wrapper">
      <div id="header-mobile">
        <Link to="/" style={{ display: 'inline-block' }}>
          <h1>BEGGARS CANYON</h1>
        </Link>
        <div id="menu-mobile">
          <Link to="/shows">Upcoming Shows</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <img  id="menu-button-mobile"
              src={menuButton}
              onClick={mobileMenuPress} />
      </div>
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="slide" timeout={1500}>
          <Routes location={location}>
            <Route path="/" element={<Main />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/galley" element={<Main />} />
            <Route path="/contact" element={<Shows />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

const Root = () => <BrowserRouter><App /></BrowserRouter>;
render(<Root />, document.getElementById('root'));