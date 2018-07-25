import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Auth from "./Utilities/Auth"
import AskQuestion from "./Pages/AskQuestion"
import Troubleshoot from "./Pages/Troubleshoot"

class Main extends React.Component {
    render() {
        return <main>
            <Switch>
                <PrivateRoute exact path='/' component={Home} search={this.props.search}/>
                <PrivateRoute exact path='/ask-question' component={AskQuestion}/>
                <PrivateRoute exact path='/troubleshoot' component={Troubleshoot}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Login}/>
            </Switch>
        </main>
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
    />
);

export default Main
