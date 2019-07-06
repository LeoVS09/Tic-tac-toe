import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from "react-router-dom";
import './App.scss';
import * as routes from './routes'
import TopBar from './containers/TopBar'
import PageLoading from './pages/Loading'

// Generate component which will be loaded only on render
const loadable = (loader: () => Promise<React.ComponentType<any> | { default: React.ComponentType<any> }>) => Loadable({
    loader,
    loading: PageLoading,
    delay: 200, // Delay before display loading indicator
    timeout: 2000 // Timeout to change loading indicator as "long time loading"
});

const App: React.FC = () => {
    return (
        <div className="App">
            <TopBar routes={[
                {to: routes.home, label: 'Home'},
                {to: routes.help, label: 'Help'}
            ]}/>

            <Switch>
                <Route
                    path={routes.home} exact
                    component={loadable(() => import('./pages/Game'))}
                />
                <Route
                    path={routes.help}
                    component={loadable(() => import('./pages/Help'))}
                />
            </Switch>
        </div>
    );
}

export default App;
