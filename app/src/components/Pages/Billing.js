import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import API from '../../api'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {NotificationManager} from 'react-notifications';

class Billing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            templates: []
        }
    }

    actionFormatter(cell, row) {
        var templates = this.state.templates.map(function(template){
            return <button className="btn btn-link" title={template.name} onClick={() => this.getPdf(row, template)}>
                <FontAwesomeIcon
                    icon="file"
                /> {template.name}
            </button>;
        }, this);

        return <div>{templates}</div>;
    }

    getPdf(quote, template) {
        API.download('billingPdf/' + quote.quote_id + "/" + template.id);
    }

    currencyFormatter(cell, row) {
        return <span>
            $ {parseFloat(cell).toFixed(2)}
        </span>;
    }

    componentDidMount() {
        this.props.setTitle('Billing & Payments');
        this.loadRows();
    }

    loadRows() {
        API.get('getBilling'
        ).then(res => {
            this.setState({rows: res.data.quotes, templates: res.data.templates});
        });
    }

    render() {
        const {rows} = this.state;
console.log(this.state);
        return <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <BootstrapTable data={ rows } bordered={ false } striped hover condensed
                                        scrollTop={ 'Bottom' }>
                            <TableHeaderColumn dataField='quote_name' isKey
                                               dataFormat={ this.nameFormatter }>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='quote_total' dataFormat={ this.currencyFormatter.bind(this) }>Amount</TableHeaderColumn>
                            <TableHeaderColumn dataField='priority' dataFormat={ this.actionFormatter.bind(this) }>Actions</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Billing