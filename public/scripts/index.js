/* index.js
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

  /*    This Component renders everything together     */


"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Remarkable from 'remarkable';
import { Router, Route, browserHistory } from 'react-router';
import Adopt from './Adopt.js';
import Create from './Create.js';
import DogBox from './DogBox.js';
import List from './List.js';
import Login from './Login.js';
import Profile from './Profile.js';
import Selection from './Selection.js';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/Login" component={Login}/>
            <Route path="/Adopt" component={Adopt}/>
            <Route path="/Create" component={Create}/>
            <Route path="/Matches" component={DogBox}/>
            <Route path="/List" component={List}/>
            <Route path="/Profile" component={Profile}/>
            <Route path="/Selection" component={Selection}/>
        </Router>
    ), document.getElementById('login')
);
