import { Navbar } from 'react-bootstrap';
import logo from '../images/cardinal_logo_white.svg';

const Header = () => {
    return (
        <Navbar className="cardinalkit-bg-color" expand="lg">
            <img
                src={logo}
                className="d-inline-block align-top"
                alt="CardinalKit Logo"
                height="75"
            />
        </Navbar>
    )
}

export default Header;