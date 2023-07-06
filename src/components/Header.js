import { Link } from 'react-router-dom';
import menuButton from '../assets/images/menu-button-mobile.png';

function Header() {

    // Show/hide mobile accordion menu
    function mobileMenuPress() {
        var x = document.getElementById('menuMobile');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
      }

    return (
        <div>
            <div id="headerMobile">
                <Link to="/" className="anim-link" style={{ display: 'inline-block' }}>
                <h4>BEGGARS CANYON</h4>
                </Link>
                <div id="menuMobile">
                <Link to="/shows" className="anim-link">Upcoming Shows</Link>
                <Link to="/gallery" className="anim-link">Gallery</Link>
                <Link to="/contact" className="anim-link">Contact</Link>
                </div>
                <img  id="menuButtonMobile"
                    src={menuButton}
                    onClick={mobileMenuPress}
                    alt="Mobile Menu Button" />
            </div>
            <div id="headerDesktop">
                <div id="headerDesktopWrapper">
                    <Link to="/" className="anim-link">Home</Link>
                    <Link to="/shows" className="anim-link">Upcoming Shows</Link>
                    <Link to="/gallery" className="anim-link">Gallery</Link>
                    <Link to="/contact" className="anim-link">Contact</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;