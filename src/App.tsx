import React, {useState} from 'react';
import './App.css';
import {Typography} from "@material-ui/core";
import UserList from "./components/user/UserList";
import Dashboard from "./components/dashboard/Dashboard";
import {Route, Switch, Router} from "react-router-dom";
import {createBrowserHistory as createHistory } from "history";
import UserDetails from "./components/user/UserDetails";
import Login from "./components/login/Login";
import {AuthContext} from "./context/auth";
import ProtectedRoute from "./components/login/ProtectedRoute";

const history = createHistory();

const App: React.FC = () => {

    const [authToken, setAuthToken] = useState();

    const setToken = (data) => {
        sessionStorage.setItem("jwt", JSON.stringify(data));
        setAuthToken(data);
    };



    return (
        <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>
                <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
                {/*<Route exact path="/dashboard" component={Dashboard}/>*/}
                <Route exact path="/users" component={UserList}/>
                <Route exact path="/users/:id" component={UserDetails}/>
                <Route render={() => <Typography variant="h3" style={{color: 'Grey', padding: 30, textAlign: "center"}}>Page not found</Typography>}/>
            </Switch>
        </Router>
        </AuthContext.Provider>
    )
};

export default App;
