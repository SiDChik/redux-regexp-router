/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { combineReducers, createStore } from 'redux'

import { Switch, Route, Link, routeReducers, createHistory, addRoutingContext } from '../index.js';

import { connect, Provider } from 'react-redux';

console.log(routeReducers);
let store = createStore(combineReducers({ ...routeReducers }));

const HashHistory = createHistory('hash');

class _Simple extends React.Component {
    render() {
        let { kwargs, routeKwargs } = this.props;
        let contextKwargs = this.context.getRouteKwargs();
        return (
            <div>
                <p>kwargs id from store: {routeKwargs.main.id}</p>
                <p>kwargs id from props: {kwargs.id}</p>
                <p>kwargs id from context: {contextKwargs.id}</p>
                <Link to="subRoute2/">relative link</Link>
                <Route path="^subRoute1/(id=\d+)/" absName="subRoute">
                    <div>
                        sub 1
                        <Link to="subRoute11/44/">relative link sub 1</Link>

                    </div>
                </Route>
                <Route path="^subRoute2/">
                    <div>
                        sub 2
                        <Link to="subRoute22/">relative link sub 2</Link>

                    </div>
                </Route>

            </div>
        );
    }
}
;
addRoutingContext(_Simple);

const Simple = connect(state => ({ routeKwargs: state.routeKwargs }))(_Simple);

ReactDom.render(
    <Provider store={store}>
        <HashHistory>
            <div>
                <h3>Basic Usage</h3>
                <ul>
                <li><Link to="/test/22/">test id: 22</Link></li>
                <li><Link to="/test/23/">test id: 23</Link></li>
                <ul>
                <li><Link to="/test/22/subRoute1/33/">test 1.1 sub 1 absolute</Link></li>
                </ul>
                </ul>
                <blockquote style={{ padding: '20px', background: '#f0f0f0' }}>
                <Route path="^/test/(id=\d+)/" name="main">
                <Simple/>
                </Route>
                </blockquote>

                <h3>Switch</h3>
                <ul>
                <li><Link to="/test2/">test 2</Link></li>
                <ul>
                <li><Link to="/test2/123">123</Link></li>
                <li><Link to="/test2/12">12</Link></li>
                <li><Link to="/test2/1">1</Link></li>
                <li><Link to="/test2/not_found">not_found</Link></li>
                </ul>
                </ul>
                <blockquote style={{ padding: '20px', background: '#f0f0f0' }}>
                <Route path="^/test2/">
                <div>
                <h4>test 2</h4>
                <h5>No Switch</h5>
                <Route path="^123">
                <div>123</div>
                </Route>
                <Route path="^12">
                <div>12</div>
                </Route>
                <Route path="^1">
                <div>1</div>
                </Route>
                <h5>With Switch</h5>
                <Switch>
                <Route path="^123">
                <div>123</div>
                </Route>
                <Route path="^12" name="sub12">
                <div>12</div>
                </Route>
                <Route path="^1">
                <div>1</div>
                </Route>
                <Route>
                <div>Not Found Path</div>
                </Route>
                </Switch>
                </div>
                </Route>
                </blockquote>


                <h3>Test Switch in Switch</h3>
                <Switch>
                    <Route path="^/sw1/">
                        <div>
                            another switch<br/>
                            <Switch>
                                <Route path="^sw2/">
                                    <div><Link to="test/">test</Link></div>
                                </Route>
                                <Route>
                                    <div><Link to="sw2/">sw2</Link></div>
                                </Route>
                            </Switch>
                        </div>
                    </Route>
                    <Route><Link to="sw1/">sw1</Link></Route>
                </Switch>

                <h3>control</h3>
                <Route path="^/sw1/">
                    <div>
                        <Link to="sw2/">sw2</Link>
                        <Route path="^sw2/">
                            <Link to="2">2</Link>
                        </Route>
                    </div>
                </Route>
                <h3>control2</h3>
                <Route path="^/sw1/">
                    <div>
                        <div>
                        <Link to="sw2/">sw2</Link>
                        <Route path="^sw2/">
                            <div>
                                <Link to="2">2</Link>
                            </div>
                        </Route>
                        </div>
                    </div>
                </Route>
            </div>
        </HashHistory>
    </Provider>
    , document.getElementById('app'));