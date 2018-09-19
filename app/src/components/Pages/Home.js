import React from 'react'
import TopKbRows from '../KnowledgeLists/TopKbRows'
import SearchKb from '../KnowledgeLists/SearchKb'
import Newsfeed from '../Newsfeed/Newsfeed'

class Home extends React.Component {
    componentDidMount() {
        this.props.setTitle('Dashboard');
    }

    render() {
        return (
            <div>
                <SearchKb search={this.props.search}/>
                <div class="row">
                    < TopKbRows />
                    < Newsfeed />
                </div>
            </div>
        )
    }
}

export default Home
