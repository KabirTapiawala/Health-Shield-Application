import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HealthProfile from './components/HealthProfile';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/profile" component={HealthProfile} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
