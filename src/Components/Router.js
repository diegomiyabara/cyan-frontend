import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from  './HomePage'
import MillsPage from './MillsPage';

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/login">
                    <LoginPage />
                </Route>
                <Route exact path = "/mills">
                    <MillsPage/>
                </Route>
                <Route path = "/">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router