import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import KnowledgeList from './KnowledgeList';

const cookies = new Cookies();

class TopKbRows extends React.Component {
    state = {
        rows: []
    };

    componentDidMount() {
        axios.get('/topKbRows?token=' + cookies.get('loginToken') + '&sugar_url=' + localStorage.getItem('sugar_url'))
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