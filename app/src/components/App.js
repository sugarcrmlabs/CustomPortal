import React from 'react'
import Header from './Pages/Header'
import Main from './Main'
import Sidebar from './Pages/Sidebar'
import {Redirect} from 'react-router-dom'
import {Col} from 'react-bootstrap'
import {NotificationContainer} from 'react-notifications';


class App extends React.Component {
    state = {
        search: '',
        reload: 0
    };

    changeSearch(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    keyPress(e) {
        if (e.keyCode === 13 && this.state.search !== '') {
            this.setState({reload: 1});
        }
    }

    renderRedirect() {
        if (this.state.reload) {
            return <Redirect to={{pathname: '/'}}/>
        }
    }

    render() {
        return <div className="container">
            {this.renderRedirect()}
            <Header search={this.state.search} changeSearch={this.changeSearch.bind(this)}
                    keyPress={this.keyPress.bind(this)}/>
            <div className="separator"></div>
            <Col sm={9}>
                <Main search={this.state.search}/>
            </Col>
            <Col sm={3}>
                <Sidebar />
            </Col>
            <NotificationContainer/>
        </div>
    }
}
;

export default App
