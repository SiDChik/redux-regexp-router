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


        extractQuery(query) {
            return {};
        }

        constructor(props) {
            super(props);
            this.state = {
                location: null,
                action: null
            };
            props.dispatch(_setRouting({
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
                    props.dispatch(_setRouting({
                        location: this.state.location,
                        query: this.extractQuery(),
                    }));
                });
            })

        }

        componentWillMount() {

        }

        componentWillUnmount() {
            this.unlisten();
        }

        render() {
            // # render only on ready
            const {routing} = this.props;
            if (!routing.location) return null;
            return React.Children.only(this.props.children);
        }
    }

    const mapStateToProps = (state /*, ownProps*/) => {
      return {
        routing: state.routing
      }
    };

    return connect(mapStateToProps)(History);
};

const HashHistory = createHistory('hash');
const BrowserHistory = createHistory('browser');
const MemoryHistory = createHistory('memory');

export { HashHistory, BrowserHistory, MemoryHistory }
export default createHistory;