import React from 'react'
import {Link} from 'react-router-dom'
import API from '../../api'

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
    }

    componentWillReceiveProps(props) {
        this.setState(props.data);
    }

    errorWrapper() {
        return <div class="formErrors">
            <p className="bg-danger">{this.state.message}</p>
        </div>
    }

    succesWrapper() {
        return <div class="formErrors">
            <p className="bg-success">{this.state.message}</p>
        </div>
    }

    render() {
        if (this.state.finished) {
            if (this.state.status === 'success') {
                return this.succesWrapper();
            } else if (this.state.status === 'error') {
                return this.errorWrapper();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

class AskQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: 0,
            message: '',
            status: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let that = this;
        API.post('submit-question', data)
            .then(res => {
                that.setState({
                    finished: 1,
                    status: 'success',
                    message: 'Your questions has been submitted with success'
                });
            })
            .catch(err => {
                that.setState({finished: 1, status: 'error', message: err.error_message});
            });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 class="no-margin-top">Ask a Question</h2>
                <div>
                    <Feedback data={this.state}/>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" class="form-control" aria-describedby="helpBlock"
                               name="subject" required/>
                        <span id="helpBlock" class="help-block">A short summary of your question</span>
                    </div>
                    <div class="form-group">
                        <label for="description">Issue</label>
                        <textarea id="description" class="form-control" aria-describedby="helpBlock"
                                  name="description" required></textarea>
                        <span id="helpBlock" class="help-block">You can describe your case here</span>
                    </div>
                    <div class="form-group">
                        <div class="dropdown left">
                            <label for="category">Category</label>
                            <select class="form-control" name='category' id="category_drop">
                                <option value=""></option>
                                <option value="Billing">Billing</option>
                                <option value="Services">Services</option>
                                <option value="Outages">Outages</option>
                                <option value="Product">Product</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="dropdown right">
                            <label for="priority">Priority</label>
                            <select class="form-control" name='priority' id="priority">
                                <option value="P1">High</option>
                                <option value="P2">Medium</option>
                                <option value="P3">Low</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" class="form-control" aria-describedby="helpBlock"
                               name="email"/>
                    </div>
                    <div class="form-group">
                        <div class="left">
                            <label for="name">First Name</label>
                            <input id="first_name" class="form-control" aria-describedby="helpBlock"
                                   name="first_name"/>
                        </div>
                        <div class="right">
                            <label for="name">Last Name</label>
                            <input id="last_name" class="form-control" aria-describedby="helpBlock"
                                   name="last_name"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <Link to="/" className="btn btn-default">Cancel</Link>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}

export default AskQuestion