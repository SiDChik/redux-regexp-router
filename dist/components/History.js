'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemoryHistory = exports.BrowserHistory = exports.HashHistory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

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
            historyCreator = _createHashHistory2.default;
            break;
        case 'browser':
            historyCreator = _createBrowserHistory2.default;
            break;
        case 'memory':
            historyCreator = _createMemoryHistory2.default;
            break;
        default:
            historyCreator = _createHashHistory2.default;
    }

    var History = function (_React$Component) {
        _inherits(History, _React$Component);

        function History() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, History);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = History.__proto__ || Object.getPrototypeOf(History)).call.apply(_ref, [this].concat(args))), _this), _this.history = historyCreator(), _this.state = {
                location: null,
                action: null
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(History, [{
            key: 'extractQuery',
            value: function extractQuery(query) {
                return {};
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                this.props.dispatch((0, _routing._setRouting)({
                    historyType: historyType,
                    history: this.history,
                    location: this.history.location,
                    query: this.extractQuery()
                }));

                this.unlisten = this.history.listen(function (location, action) {
                    // location is an object like window.location
                    _this2.setState({
                        location: location,
                        action: action
                    }, function () {
                        this.props.dispatch((0, _routing._setRouting)({
                            location: this.state.location,
                            query: this.extractQuery()
                        }));
                    });
                });
            }
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

    return (0, _reactRedux.connect)(function (state) {
        return { routing: state.routing };
    })(History);
};

var HashHistory = createHistory('hash');
var BrowserHistory = createHistory('browser');
var MemoryHistory = createHistory('memory');

exports.HashHistory = HashHistory;
exports.BrowserHistory = BrowserHistory;
exports.MemoryHistory = MemoryHistory;
exports.default = createHistory;
//# sourceMappingURL=History.js.map