import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Auth from "./Utilities/Auth"
import AskQuestion from "./Pages/AskQuestion"
import Troubleshoot from "./Pages/Troubleshoot"
import NoMatch from "./Pages/NoMatch"
import TicketsList from "./Pages/Tickets/TicketsList"
import TicketsEdit from "./Pages/Tickets/TicketsEdit"

class Main extends React.Component {
    render() {
        return <Switch>
                <PrivateRoute exact path='/' component={Home} search={this.props.search} setTitle={this.props.setTitle}/>
                <PrivateRoute exact path='/ask-question' component={AskQuestion} setTitle={this.props.setTitle}/>
                <PrivateRoute exact path='/troubleshoot' component={Troubleshoot} setTitle={this.props.setTitle}/>
                <PrivateRoute exact path='/tickets' component={TicketsList} setTitle={this.props.setTitle}/>
                <PrivateRoute exact path='/tickets/:id' component={TicketsEdit} setTitle={this.props.setTitle}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Login}/>
                <Route component={NoMatch} />
            </Switch>

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
