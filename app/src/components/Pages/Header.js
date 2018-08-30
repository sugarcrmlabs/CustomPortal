import React from 'react'
import Auth from "../Utilities/Auth"


class Header extends React.Component {
    render() {
        if (Auth.isAuthenticated()) {
            return <h1>
                {this.props.title}
            </h1>
        } else {
            return null;
        }
    }
}

export default Header
