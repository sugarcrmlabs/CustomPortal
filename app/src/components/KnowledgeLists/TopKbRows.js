import React from 'react'
import KnowledgeList from './KnowledgeList'
import API from '../../api'

class TopKbRows extends React.Component {
    state = {
        rows: []
    };

    componentDidMount() {
        API.get('topKbRows')
            .then(res => {
                this.setState({rows: res.data});
            });
    }

    render() {
        const {rows} = this.state;

        if (this.state.rows.length) {
            return (
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class ="panel-heading">
                            <div class="panel-title">Top 5 FAQ</div>
                        </div>
                        <div class="panel-body">
                            <KnowledgeList rows={rows}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default TopKbRows