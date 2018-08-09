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
        const { rows } = this.state;

        if (this.state.rows.length) {
            return (
                <div>
                    <div class="top-5-faq bg-primary">
                        Top 5 FAQ
                    </div>
                    <KnowledgeList rows={rows} />
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