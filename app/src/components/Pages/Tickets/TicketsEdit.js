import React from 'react'
import {Link} from 'react-router-dom'
import API from '../../../api'
import {NotificationManager} from 'react-notifications'

class TicketsEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            record: {}
        }
    }

    componentDidMount() {
        this.props.setTitle('Update Ticket');

        API.get('getTicket/' + this.state.id
        ).then(res => {
            this.setState({record: res.data});
        });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        
        let record = this.state.record;
        record[name] = value;

        this.setState({'record': record});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let that = this;
        API.post('submit-question', data)
            .then(res => {
                NotificationManager.success("Your question has been updated with success.", 'Success!', 5000);
            })
            .catch(err => {
                NotificationManager.error(err.response.data.error_message, 'Error!', 5000);
            });
    }

    render() {
        return (
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <input type="hidden" name="id" value={this.state.record.id} />
                                <div>
                                    <div class="form-group">
                                        <label for="subject">Subject</label>
                                        <input type="text" id="subject" class="form-control"
                                               aria-describedby="helpBlock" onChange={(event) => this.handleUserInput(event)}
                                               name="subject" value={this.state.record.name} required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Issue</label>
                        <textarea id="description" class="form-control" aria-describedby="helpBlock"
                                  name="description" value={this.state.record.description} required
                                  onChange={(event) => this.handleUserInput(event)}></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <Link to="/tickets" className="btn btn-default">Cancel</Link>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketsEdit