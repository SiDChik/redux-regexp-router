/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import createHashHistory from 'history/createHashHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { _setRouting } from '../actions/routing';

const historyWrapper = (createHistory, historyType) => {
    class History extends React.Component {
        history = createHistory();

        state = {
            location: null,
            action: null
        };

        extractQuery(query) {
            return {};
        }

        componentWillMount() {
            this.props.dispatch(_setRouting({
                historyType: historyType,
                history: this.history,
                location: this.history.location,
                query: this.extractQuery(),
            }));

            this.unlisten = this.history.listen((location, action) => {
                // location is an object like window.location
                this.setState({
                    location: location,
                    action: action
                }, function () {
                    this.props.dispatch(_setRouting({
                        location: this.state.location,
                        query: this.extractQuery(),
                    }));
                });
            })
        }

        componentWillUnmount() {
            this.unlisten();
        }

        render() {
            return React.Children.only(this.props.children);
        }
    }

    return connect(state => ({routing: state.routing}))(History);
};

const HashHistory = historyWrapper(createHashHistory, 'hash');
const BrowserHistory = historyWrapper(createBrowserHistory, 'browser');
const MemoryHistory = historyWrapper(createMemoryHistory, 'memory');

export { HashHistory, BrowserHistory, MemoryHistory }
export default HashHistory;