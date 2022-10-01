import './index.css';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import menuButton from './assets/images/menu-button-mobile.png';

function App() {
  const location = useLocation();

  return (
    <div className="wrapper">
      <div className="header-mobile">
        <Link to="/">
          <h1>BEGGARS CANYON</h1>
        </Link>
        <div className="menu-mobile">
          <Link to="/shows">Upcoming Shows</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <img className="menu-button-mobile" src={menuButton} />
      </div>
    </div>
  );
}

const Root = () => <BrowserRouter><App /></BrowserRouter>;
render(<Root />, document.getElementById('root'));