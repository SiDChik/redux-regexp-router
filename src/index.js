/**
 * Created by sidchik on 28.03.17.
 */
export { Route, Switch, Link } from './components';
export createHistory from './components/History';
export { HashHistory, BrowserHistory, MemoryHistory } from './components/History';
export * as routeReducers from './reducers';
export { addRoutingContext } from './helpers/context';
export {SET_ROUTING, SET_KWARGS_ROUTING, PUSH_ROUTING, pushPath} from './actions/routing'
// export * from './actions/routing';
