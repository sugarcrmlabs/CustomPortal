import React from 'react'
import {Redirect} from "react-router-dom"
import Auth from "../Utilities/Auth"
import {FormErrors} from '../Utilities/FormErrors'

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        username: '',
        password: '',
        sugar_url: localStorage.getItem('sugar_url'),
        formErrors: {},
        usernameValid: false,
        passwordValid: false,
        sugar_urlValid: localStorage.getItem('sugar_url') ? true : false,
        formValid: false
    };

    login = () => {
        localStorage.setItem('sugar_url', this.state.sugar_url);

        Auth.authenticate((resp) => {

            if (!resp.error) {
                this.setState({redirectToReferrer: true});
            } else {
                let authErrors = {};

                authErrors[resp.error] = resp.error_message;
                this.setState({formErrors: authErrors});
            }

        }, this.state);
    };

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let sugar_urlValid = this.state.sugar_urlValid;

        switch (fieldName) {
            case 'username':
                usernameValid = value.length > 0;

                if (usernameValid) {
                    delete fieldValidationErrors.username;
                } else {
                    fieldValidationErrors.username = 'Username is empty';
                }

                break;
            case 'password':
                passwordValid = value.length > 0;

                if (passwordValid) {
                    delete fieldValidationErrors.password;
                } else {
                    fieldValidationErrors.password = 'Password is empty';
                }

                break;
            case 'sugar_url':
                sugar_urlValid = value.length > 0;

                if (sugar_urlValid) {
                    delete fieldValidationErrors.sugar_url;
                } else {
                    fieldValidationErrors.sugar_url = 'Sugar instance url is empty';
                }

                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid,
            sugar_urlValid: sugar_urlValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid && this.state.sugar_urlValid});
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        if (Auth.isAuthenticated()) {
            return <Redirect to='/'/>;
        }

        return (
            <div className="login-container">
                <div className="float-left">
                    <img src="../app/build/images/beach-glass.png" alt="BeachGlass" className="beach-glass" />
                </div>
                <div className="col-sm-6">
                    <h2>Sign In</h2>
                    <div className={(Object.keys(this.state.formErrors).length === 0 ? 'hidden' : ' ')}>
                        <FormErrors formErrors={this.state.formErrors}/>
                    </div>
                    <div className="form-group">
                        <label for="subject">Sugar Instance URL</label>
                        <input type="text" id="sugar_url" className="form-control" name="sugar_url"
                               required onChange={(event) => this.handleUserInput(event)} value={this.state.sugar_url}/>
                    </div>
                    <div className="form-group">
                        <label for="subject">Username</label>
                        <input type="text" id="username" className="form-control" name="username"
                               required onChange={(event) => this.handleUserInput(event)} value={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <label for="subject">Password</label>
                        <input type="password" id="password" className="form-control" name="password"
                               required onChange={(event) => this.handleUserInput(event)} value={this.state.password}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.login} disabled={!this.state.formValid}>Log in
                    </button>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Login