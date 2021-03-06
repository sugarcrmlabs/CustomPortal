import React from 'react'
import API from '../../api'

class Newsfeed extends React.Component {
    state = {
        rows: JSON.parse(localStorage.getItem('news_feed'))
    };

    componentDidMount() {
        if (this.state.rows === false || this.state.rows == null) {
            API.get('getNewsFeed')
                .then(res => {
                    localStorage.setItem('news_feed', JSON.stringify(res.data));
                    this.setState({rows: res.data});
                });
        }
    }

    render() {
        const {rows} = this.state;

        if (rows != null && rows !== 'false' && rows.length) {
            return (
                <div class="col-lg-5">
                    <div class="panel panel-default">
                        <div class ="panel-heading">
                            <div class="panel-title">Corporate News</div>
                        </div>
                        <div class="panel-body">
                            <ul class="news-feed">
                                {rows.map((row) => <li><a href={row.link} target="_blank">{row.content}</a></li>)}
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
