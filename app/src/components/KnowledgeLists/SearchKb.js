import React from 'react'
import KnowledgeList from './KnowledgeList'
import {Link} from 'react-router-dom'
import API from '../../api'

class SearchKb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.search,
            category: '',
            rows: []
        }
    }

    componentDidMount() {
        this.loadRows();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search) {
            this.loadRows();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.search !== this.state.search) {
            this.setState({search: nextProps.search});
        }
    }

    loadRows() {
        API.get('searchKbRows',
            {
                search: this.state.search,
                category: this.state.category
            }
        ).then(res => {
            this.setState({rows: res.data, category: ''});
        });
    }

    handleSearch() {
        this.setState({search: document.getElementById('search').value});
    }

    handleCategoryFilter(category) {
        this.setState({category: category});

        this.loadRows();
    }

    render() {
        const {rows} = this.state;

        return (
            <div class="row">
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="panel-title">Knowledgebase</div>
                        </div>
                        <div class="panel-body">
                            <div class="input-group">
                                <div class="icon-addon addon-lg">
                                    <input type="text" placeholder="Enter a search topic" class="form-control"
                                           name="search"
                                           id="search" onChange={() => this.handleSearch()}
                                           value={this.state.search}/>
                                    <label for="search" class="fa fa-search" rel="tooltip" title="search"></label>
                                </div>
                                <button type="button" name="save" onClick={() => this.loadRows()}
                                        class="btn btn-primary mySubmit">Search
                                </button>
                            </div>

                            <KnowledgeList rows={rows}/>
                        </div>
                    </div>
                </div>

                <div class="col-lg-5">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="panel-title">Quick Links</div>
                        </div>
                        <div class="panel-body">
                            <div class="category-list">
                                <Link to="troubleshoot" className="category-filter">
                                    <img src="../app/build/images/troubleshoot.png" alt="Troubleshoot"/>
                                    <div class="category-name">Troubleshoot</div>
                                </Link>
                                <div class="category-filter"
                                     onClick={() => this.handleCategoryFilter('Billing & Payments')}>
                                    <img src="../app/build/images/billing.png" alt="Billing & Payments"/>

                                    <div class="category-name">Billing & Payments</div>
                                </div>
                                <div class="category-filter generic"
                                     onClick={() => this.handleCategoryFilter('Product Support')}>
                                    <img src="../app/build/images/productsupport.png" alt="Product Support"/>

                                    <div class="category-name">Product Support</div>
                                </div>
                                <div class="category-filter generic"
                                     onClick={() => this.handleCategoryFilter('General')}>
                                    <img src="../app/build/images/general.png" alt="General"/>

                                    <div class="category-name">General</div>
                                </div>
                                <Link to="new-ticket" className="category-filter">
                                    <img src="../app/build/images/customer-service.png" alt="General"/>
                                    <div class="category-name">New Ticket</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchKb