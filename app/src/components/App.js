import React from 'react'
import Header from './Pages/Header'
import Main from './Main'
import Sidebar from './Pages/Sidebar'
import {Redirect} from 'react-router-dom'
import {NotificationContainer} from 'react-notifications';


class App extends React.Component {
    state = {
        search: '',
        reload: 0,
        title: ''
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

    setTitle(title) {
        this.setState({title: title});
    }

    renderRedirect() {
        if (this.state.reload) {
            return <Redirect to={{pathname: '/'}}/>
        }
    }

    render() {
        return <div class="content">
            {this.renderRedirect()}
            <Sidebar />
            <section>
                <div class="sectionHeader">
                    <Header search={this.state.search} changeSearch={this.changeSearch.bind(this)}
                            keyPress={this.keyPress.bind(this)} title={this.state.title}/>
                </div>
                <div class="sectionContent">
                    <Main search={this.state.search} setTitle={this.setTitle.bind(this)}/>
                </div>
            </section>
            <NotificationContainer/>
        </div>
    }
}
;

export default App
