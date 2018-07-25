import React from 'react'
import { Link } from 'react-router-dom'
import {Col} from 'react-bootstrap'
import Auth from '../Utilities/Auth'

class Sidebar extends React.Component {
    render() {
        if (Auth.isAuthenticated()) {
            return (
                <Col sm={3}>
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
                </Col>
            );
        } else {
            return null;
        }
    }
}

export default Sidebar
