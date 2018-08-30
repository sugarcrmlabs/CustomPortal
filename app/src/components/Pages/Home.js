import React from 'react'
import TopKbRows from '../KnowledgeLists/TopKbRows'
import SearchKb from '../KnowledgeLists/SearchKb'

class Home extends React.Component {
    componentDidMount() {
        this.props.setTitle('Dashboard');
    }

    render() {
        return (
            <div>
                <SearchKb search={this.props.search}/>
                < TopKbRows />
            </div>
        )
    }
}

export default Home
