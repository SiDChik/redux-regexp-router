'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemoryHistory = exports.BrowserHistory = exports.HashHistory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _history = require('history');

var _routing = require('../actions/routing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sidchik on 28.03.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var createHistory = function createHistory(historyType) {
    var historyCreator = void 0;
    switch (historyType) {
        case 'hash':
            historyCreator = _history.createHashHistory;
            break;
        case 'browser':
            historyCreator = _history.createBrowserHistory;
            break;
        case 'memory':
            historyCreator = _history.createMemoryHistory;
            break;
        default:
            historyCreator = _history.createHashHistory;
    }

    var History = function (_React$Component) {
        _inherits(History, _React$Component);

        _createClass(History, [{
            key: 'extractQuery',
            value: function extractQuery(query) {
                return {};
            }
        }]);

        function History(props) {
            _classCallCheck(this, History);

            var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, props));

            _this.history = historyCreator();

            _this.state = {
                location: null,
                action: null
            };
            props.dispatch((0, _routing._setRouting)({
                historyType: historyType,
                history: _this.history,
                location: _this.history.location,
                query: _this.extractQuery()
            }));

            _this.unlisten = _this.history.listen(function (location, action) {
                // location is an object like window.location
                _this.setState({
                    location: location,
                    action: action
                }, function () {
                    props.dispatch((0, _routing._setRouting)({
                        location: this.state.location,
                        query: this.extractQuery()
                    }));
                });
            });

            return _this;
        }

        _createClass(History, [{
            key: 'componentWillMount',
            value: function componentWillMount() {}
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.unlisten();
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.Children.only(this.props.children);
            }
        }]);

        return History;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state /*, ownProps*/) {
        return {
            routing: state.routing
        };
    };

    return (0, _reactRedux.connect)(mapStateToProps)(History);
};

var HashHistory = createHistory('hash');
var BrowserHistory = createHistory('browser');
var MemoryHistory = createHistory('memory');

exports.HashHistory = HashHistory;
exports.BrowserHistory = BrowserHistory;
exports.MemoryHistory = MemoryHistory;
exports.default = createHistory;
//# sourceMappingURL=History.js.map