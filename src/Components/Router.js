import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from  './HomePage'
import MillsPage from './MillsPage';
import HarvestsPage from './HarvestsPage';
import FarmsPage from './FarmsPage';
import FieldsPage from './FieldsPage';
import FieldMap from './FieldMap';

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
                <Route exact path = "/harvests/:millId">
                    <HarvestsPage/>
                </Route>
                <Route exact path = "/farms/:harvestId">
                    <FarmsPage/>
                </Route>
                <Route exact path = "/fields/:farmId">
                    <FieldsPage/>
                </Route>
                <Route exact path = "/fieldmap/:fieldId/:farmId">
                    <FieldMap/>
                </Route>
                <Route path = "/">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router