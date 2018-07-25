import React from 'react'
import {Col} from 'react-bootstrap'
import TopKbRows from '../KnowledgeLists/TopKbRows'
import SearchKb from '../KnowledgeLists/SearchKb'

class Home extends React.Component {
    render() {
        return (
            <Col sm={9}>
                <SearchKb search={this.props.search}/>
                <TopKbRows />
            </Col>
        )
    }
}

export default Home
