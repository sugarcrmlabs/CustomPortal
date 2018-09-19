import React from 'react'
import API from '../../api'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class Newsfeed extends React.Component {
    state = {
        rows: localStorage.getItem('news_feed')
    };

    componentDidMount() {
        if (this.state.rows === 'false' || this.state.rows == null) {
            API.get('getNewsFeed')
                .then(res => {
                    console.log(res);
                    this.setState({rows: res.data});
                });
        }
    }

    render() {
        const {rows} = this.state;

        if (this.state.rows != null && this.state.rows !== 'false' && this.state.rows.length) {
            return (
                <div class="col-lg-5">
                    <div class="panel panel-default">
                        <div class ="panel-heading">
                            <div class="panel-title">News</div>
                        </div>
                        <div class="panel-body">
                            <ul class="news-feed">
                                {rows.map((row) => <li><a href={row.link}>{row.content}</a></li>)}
                            </ul>
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

export default Newsfeed