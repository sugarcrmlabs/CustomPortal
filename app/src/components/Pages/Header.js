import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Auth from "../Utilities/Auth"

function LoginButton(props) {
    return (
        <Link to="/login">Login</Link>
    );
}

function LogoutButton(props) {
    return (
        <Link to="/logout" onClick={props.onClick}>Logout</Link>
    );
}

class Header extends React.Component {
    handleLogoutClick() {
        Auth.logout();
    }

    render() {
        const isLoggedIn = Auth.isAuthenticated();
        let button, search;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            search = <Col className="search-button text-right" sm={3} xs={3}>
                <input type="text" id="main-search"  placeholder="Global 0Search" name="search" onChange={(event) => this.props.changeSearch(event)}
                       onKeyDown={this.props.keyPress} value={this.props.search}/>
            </Col>;
        } else {
            button = <LoginButton />
            search = '';
        }

        return <div className="header">
            <Row className="show-grid">
                <Col className="logo" sm={4} xs={4}>
                    <Link to="/">
                        <img src="../app/build/images/company_logo.png" alt="SugarCRM"/>
                    </Link>
                </Col>
                <Col className="menu" sm={5} xs={5}>
                    <ul>
                        <li className="with-separator"><Link to='/'>Home</Link></li>
                        <li className="with-separator"><Link to='/tickets'>Tickets</Link></li>
                        <li>{button}</li>
                    </ul>
                </Col>
                {search}

                <div class="clearfix"></div>
            </Row>
            <img src="../app/build/images/cover-beach.jpg" style={{marginTop: 15 + "px"}} alt="Banner"/>
        </div>
    }
}

export default Header
