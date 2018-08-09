import React from 'react'
import {Link} from 'react-router-dom'
import API from '../../../api'

class TicketsEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            record: {}
        }
    }

    componentDidMount() {
        API.get('getTicket/' + this.state.id
        ).then(res => {
            this.setState({record: res.data});
        });
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
                <h2 class="no-margin-top">Update Ticket</h2>
                <div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" class="form-control" aria-describedby="helpBlock"
                               name="subject" value={this.state.record.name} required/>
                    </div>
                    <div class="form-group">
                        <label for="description">Issue</label>
                        <textarea id="description" class="form-control" aria-describedby="helpBlock"
                                  name="description" value={this.state.record.description} required></textarea>
                    </div>
                    <div class="modal-footer">
                        <Link to="/tickets" className="btn btn-default">Cancel</Link>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default TicketsEdit