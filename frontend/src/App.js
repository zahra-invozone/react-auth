import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import axios from 'axios';
import {Nav} from "react-bootstrap";
import Login from './Login';
import Register from './register';
import Dashboard from './Dashboard';
import Home from './Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import {getToken, removeUserSession, setUserSession} from './Utils/Common';

function App(props) {
    const [authLoading, setAuthLoading] = useState(true);
    const token = getToken();

    useEffect(() => {
        // const token = getToken();
        if (!token) {
            return;
        }

        axios.get(`http://localhost:8080/verifyToken?token=${token}`).then(response => {
            setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }
    const isLoggedin = props.isLoggedin

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>React Training</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="outer">
                    <div className="inner">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <PublicRoute path="/login" component={Login}/>
                            <PublicRoute path="/sign-up" component={Register}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}


export default App;
