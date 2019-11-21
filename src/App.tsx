import React from 'react';
import './App.css';
import {AppBar, Toolbar, Typography, MenuItem, Divider} from "@material-ui/core";
import UserList from "./components/user/UserList";
import Dashboard from "./components/dashboard/Dashboard";
import {Route, Switch, Link, Router} from "react-router-dom";
import {createBrowserHistory as createHistory } from "history";
import UserDetails from "./components/user/UserDetails";

const history = createHistory();

const App: React.FC = () => {


    return (
        <Router history={history}>
        <div className="App">
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">License System</Typography>
                    <Divider orientation="vertical" style={{marginLeft: 30, marginRight: 15}}/>
                    <MenuItem>
                        <Link to="/" style={{color: 'Grey'}}>Dashboard</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/users" style={{color: 'Grey'}}>Users</Link>
                    </MenuItem>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/users" component={UserList}/>
                <Route exact path="/users/:id" component={UserDetails}/>
            </Switch>

        </div>
        </Router>
    )
};

export default App;
