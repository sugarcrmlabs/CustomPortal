import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function nameFormatter(cell, row) {
    return <a href={localStorage.getItem('sugar_url') + "#KBContents/" + row.id}
              target="_blank">{cell}</a>;
}

class KnowledgeList extends React.Component {
    render() {
        const {rows} = this.props;

        return (
            <BootstrapTable data={ rows } bordered={ false } striped hover condensed height='200' scrollTop={ 'Bottom' }>
                <TableHeaderColumn dataField='name' isKey dataFormat={ nameFormatter }>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
            </BootstrapTable>

        )

    }
}

export default KnowledgeList