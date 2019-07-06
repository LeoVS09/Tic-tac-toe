import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.scss';
import * as routes from './routes'
import TopBar from './containers/TopBar'
import Game from './pages/Game'
import Help from './pages/Help'

const App: React.FC = () => {
    return (
        <div className="App">
            <TopBar routes={[
                {to: routes.home, label: 'Home'},
                {to: routes.help, label: 'Help'}
            ]}/>

            <Switch>
                <Route path={routes.home} exact component={Game} />
                <Route path={routes.help} component={Help} />
            </Switch>
        </div>
    );
}

export default App;
