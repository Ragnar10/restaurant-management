import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from '../Header/Header';
import Tables from "../Tables/Tables";
import Waiters from "../Waiters/Waiters";
import Dishes from "../Dishes/Dishes";
import Checks from "../Checks/Checks";
import Analytics from "../Analytics/Analytics";

import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Header/>
                <div className='pages'>
                    <Switch>
                        <Route path='/tables' component={Tables}/>
                        <Route path='/waiters' component={Waiters}/>
                        <Route path='/dishes' component={Dishes}/>
                        <Route path='/checks' component={Checks}/>
                        <Route path='/analytics/:id?' component={Analytics}/>
                        <Route>
                            <Redirect to='/tables'/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;