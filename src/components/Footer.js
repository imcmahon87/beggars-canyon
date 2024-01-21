import iconFacebook from '../assets/images/icon-facebook.png';
import iconInstagram from '../assets/images/icon-instagram.png';
import iconSpotify from '../assets/images/icon-spotify.png';

function Footer() {
    return (
        <div id="footer">
            <p>&copy; 2024 Beggars Canyon</p>
            <span><a target="_blank" href="https://www.facebook.com/beggarscanyonpdx"><img src={iconFacebook} /></a></span>
            <span><a target="_blank" href="https://www.instagram.com/beggars_canyon"><img src={iconInstagram} /></a></span>
            <span><a target="_blank" href="https://open.spotify.com/artist/4q6SYdyrRaHOxJfc2Uhmgn?si=vm7cuy2gSt6so_-LeeKCJA"><img src={iconSpotify} /></a></span>
        </div>
    );
}

export default Footer;