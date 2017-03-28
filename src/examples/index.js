/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { combineReducers, createStore } from 'redux'

import Route from '../components/Route';
import Link from '../components/Link';

import * as reducers from '../reducers';
import { Provider } from 'react-redux';
import HashHistory from '../components/History';

let store = createStore(combineReducers({...reducers}));

ReactDom.render(
    <Provider store={store}>
        <HashHistory>
            <div>
                <ul>
                    <li><Link to="/test/22/">test 1</Link></li>
                    <ul>
                        <li><Link to="/test/22/subRoute/">test 1.1</Link></li>
                    </ul>
                    <li><Link to="/test2">test 2</Link></li>
                </ul>
                <Route path="^/test/(id{\d+})/">
                    <div>
                        test
                        <Route path="^subRoute"><div>sub</div></Route>
                        <Route path="test/(\d+)" absolute><div>testabsolute</div></Route>
                    </div>
                </Route>
                <Route path="^/test2"><div>test2</div></Route>
            </div>
        </HashHistory>
    </Provider>
    , document.getElementById('app'));