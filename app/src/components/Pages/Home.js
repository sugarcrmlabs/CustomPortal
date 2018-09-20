import React from 'react'
import TopKbRows from '../KnowledgeLists/TopKbRows'
import SearchKb from '../KnowledgeLists/SearchKb'
import Newsfeed from '../Newsfeed/Newsfeed'
import Jobs from '../Jobs/Jobs'

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
                <div class="row">
                    <Jobs />
                </div>
            </div>
        )
    }
}

export default Home
