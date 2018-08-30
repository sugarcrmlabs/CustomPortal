import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import API from '../../../api'
import {NotificationManager} from 'react-notifications';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TicketsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }

    nameFormatter(cell, row) {
        return <a href={localStorage.getItem('sugar_url') + "#Cases/" + row.case_id}
                  target="_blank">{cell}</a>;
    }

    actionFormatter(cell, row) {
        return <div>
            <Link to={"/tickets/" + row.case_id} className="btn btn-link" title="Edit">
                <FontAwesomeIcon
                    icon="pen"
                />
            </Link>
            <button className="btn btn-link" title="Delete" onClick={() => this.deleteTicket(row)}>
                <FontAwesomeIcon
                    icon="trash"
                />
            </button>
        </div>;
    }

    deleteTicket(item) {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            API.delete('ticket/' + item.case_id
            ).then(res => {
                const rows = this.state.rows.filter(i => i.id !== item.id)
                this.setState({rows})
                NotificationManager.success("The ticket was removed.", 'Success!', 5000);
            }).catch((error) => {
                NotificationManager.error(error.response.data.error_message, 'Error!', 5000);
            });
        }
    }

    componentDidMount() {
        this.props.setTitle('Your Tickets');
        this.loadRows();
    }

    loadRows() {
        API.get('getTickets'
        ).then(res => {
            this.setState({rows: res.data});
        });
    }

    render() {
        const {rows} = this.state;

        return (
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <BootstrapTable data={ rows } bordered={ false } striped hover condensed
                                            scrollTop={ 'Bottom' }>
                                <TableHeaderColumn dataField='case_name' isKey
                                                   dataFormat={ this.nameFormatter }>Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='priority'>Priority</TableHeaderColumn>
                                <TableHeaderColumn dataField='priority' dataFormat={ this.actionFormatter.bind(this) }>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TicketsList