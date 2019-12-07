import React, {useEffect, useState} from 'react';
import './App.css';
import UserList from "./components/user/UserList";
import Dashboard from "./components/dashboard/Dashboard";
import {Route, Switch, Router, Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {createBrowserHistory as createHistory } from "history";
import UserDetails from "./components/user/UserDetails";
import Login from "./components/login/Login";
import PageNotFound from "./components/PageNotFound";
import PartnerList from "./components/partner/PartnerList";
import PartnerDetails from "./components/partner/PartnerDetails";

const history = createHistory();

const App: React.FC<RouteComponentProps> = () => {

    const [isAuthenticated, setAuth] = useState(false);

    useEffect( () => {
        setAuth(true);
        }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>

                <Route exact path="/dashboard">{isAuthenticated ? <Dashboard/> : <Redirect to="/login" />}</Route>
                <Route exact path="/users">{isAuthenticated ? <UserList/> : <Redirect to="/login" />}</Route>
                <Route exact path="/partners">{isAuthenticated ? <PartnerList/> : <Redirect to="/login" />}</Route>
                <Route exact path="/users/:id">{isAuthenticated ? <UserDetails/> : <Redirect to="/login" />}</Route>
                <Route exact path="/partners/:id">{isAuthenticated ? <PartnerDetails/> : <Redirect to="/login" />}</Route>
                <Route exact path="/partners/users/:id">{isAuthenticated ? <UserDetails/> : <Redirect to="/login" />}</Route>


                <Route component={PageNotFound}/>

            </Switch>
        </Router>
    )
};

export default withRouter(App);
