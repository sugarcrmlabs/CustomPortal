import React from 'react'
import API from '../../api'

class Jobs extends React.Component {
    state = {
        rows: JSON.parse(localStorage.getItem('jobs'))
    };

    componentDidMount() {
        if (this.state.rows === false || this.state.rows == null) {
            API.get('getJobs')
                .then(res => {
                    localStorage.setItem('jobs', JSON.stringify(res.data));
                    this.setState({rows: res.data});
                });
        }

        var jobs = document.querySelectorAll('.job-row a');
        Array.prototype.forEach.call(jobs, function(job, index) {
            job.setAttribute('target', '_blank');
            job.href = 'http://jobs.jobvite.com' + job.getAttribute('href');
        });
    }

    render() {
        const {rows} = this.state;

        if (rows != null && rows !== 'false' && rows.length) {
            return (
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class ="panel-heading">
                            <div class="panel-title">SugarCRM Careers</div>
                        </div>
                        <div class="panel-body">
                            {rows.map((row) => <div className="job-row"><h4>{row.title}</h4><table className="jv-job-list" dangerouslySetInnerHTML={{__html: row.content}}></table></div>)}
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

export default Jobs
