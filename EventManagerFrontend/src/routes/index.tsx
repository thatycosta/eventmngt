import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import CreateEvent from '../pages/CreateEvent';
import EventPost from '../pages/EventPost';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/createEvent" component={CreateEvent} isPrivate />
        <Route path="/eventPost/:id" component={EventPost} isPrivate />
    </Switch>
)

export default Routes;