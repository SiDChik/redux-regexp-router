/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
import { _setRouting } from '../actions/routing';

const createHistory = (historyType) => {
    let historyCreator;
    switch (historyType) {
        case 'hash':
            historyCreator = createHashHistory;
            break;
        case 'browser':
            historyCreator = createBrowserHistory;
            break;
        case 'memory':
            historyCreator = createMemoryHistory;
            break;
        default:
            historyCreator = createHashHistory;
    }

    class History extends React.Component {
        history = historyCreator();

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

    return connect(state => ({ routing: state.routing }))(History);
};

const HashHistory = createHistory('hash');
const BrowserHistory = createHistory('browser');
const MemoryHistory = createHistory('memory');

export { HashHistory, BrowserHistory, MemoryHistory }
export default createHistory;