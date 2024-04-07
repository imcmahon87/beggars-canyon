import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuButton from '../assets/images/menu-button-mobile.png';
import iconFacebook from '../assets/images/icon-facebook.png';
import iconInstagram from '../assets/images/icon-instagram.png';
import iconSpotify from '../assets/images/icon-spotify.png';

function Header() {

    useEffect(() => {
        let acc = document.getElementById('menuButtonMobile');
        acc.addEventListener('click', () => {
            let panel = document.getElementById('menuMobile');
    
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }, []);
    
    /*
    // Show/hide mobile accordion menu
    function mobileMenuPress() {
        var x = document.getElementById('menuMobile');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
      }*/
      

    return (
        <div>
            <div id="headerMobileWrapper">
                <div id="headerMobile">
                    <Link to="/" className="anim-link" style={{ display: 'inline-block' }}>
                        <h4>beggars canyon</h4>
                    </Link>
                    <img id="menuButtonMobile"
                        src={menuButton}
                        alt="Mobile Menu Button" />
                </div>
                <div id="menuMobile">
                        <Link to="/releases" className="anim-link">Releases</Link>
                        <Link to="/gallery" className="anim-link">Gallery</Link>
                        <Link to="/contact" className="anim-link">Contact</Link>
                </div>
            </div>
            <div id="headerDesktop">
                <div id="headerDesktopSocial">
                    <a target="_blank" href="https://www.facebook.com/beggarscanyonpdx"><img src={iconFacebook} /></a>
                    <a target="_blank" href="https://www.instagram.com/beggars_canyon"><img src={iconInstagram} /></a>
                    <a target="_blank" href="https://open.spotify.com/artist/4q6SYdyrRaHOxJfc2Uhmgn?si=vm7cuy2gSt6so_-LeeKCJA"><img src={iconSpotify} /></a>
                </div>
                <div id="headerDesktopMain">
                    <Link to="/" className="anim-link">Home</Link>
                    <Link to="/releases" className="anim-link">Releases</Link>
                    <Link to="/gallery" className="anim-link">Gallery</Link>
                    <Link to="/contact" className="anim-link">Contact</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;