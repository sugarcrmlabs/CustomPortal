import React from 'react'
import {Link} from 'react-router-dom'
import Auth from '../Utilities/Auth'

function LogoutButton(props) {
    return (
        <Link to="/logout" onClick={props.onClick}>Logout</Link>
    );
}

class Sidebar extends React.Component {
    handleLogoutClick() {
        Auth.logout();
    }

    render() {
        if (Auth.isAuthenticated()) {
            return (
                <div class="sidebar">
                    <div class="logo">
                        <Link to="/" className="simple-text logo-mini">
                            <img src="../app/build/images/company_logo.png" alt="Troubleshoot"/>
                        </Link>
                    </div>
                    <div class="sidebar-wrapper">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/'>Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/tickets'>Tickets</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to='/billing'>Billing & Payments</Link>
                                    </li>
                                    <li class="nav-item">
                                        <LogoutButton onClick={this.handleLogoutClick}/>
                                    </li>
                                </ul>

                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    /*

     <div className="col-sm-3">
     <div>
     <div class="sidebar-title bg-primary">
     Notifications
     </div>
     <div class="sidebar-content">
     Service outage for zip code 53128
     <br/><br/>
     </div>
     <div class="sidebar-title bg-primary">
     Contact-us
     </div>
     <div class="contact-container">
     <Link to="/ask-question" className="contact-row">
     <img src="../app/build/images/email.png" alt="Ask a Question"/>
     <div class="to-middle">
     <span class="title">Ask a Question</span>
     <span>Submit a question to our support team</span>
     </div>
     </Link>
     </div>
     </div>
     </div>
     */
}

export default Sidebar
