'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by sidchik on 28.03.17.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _index = require('../index.js');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log(_index.routeReducers);
var store = (0, _redux.createStore)((0, _redux.combineReducers)(_extends({}, _index.routeReducers)));

var HashHistory = (0, _index.createHistory)('hash');

var _Simple = function (_React$Component) {
    _inherits(_Simple, _React$Component);

    function _Simple() {
        _classCallCheck(this, _Simple);

        return _possibleConstructorReturn(this, (_Simple.__proto__ || Object.getPrototypeOf(_Simple)).apply(this, arguments));
    }

    _createClass(_Simple, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                kwargs = _props.kwargs,
                routeKwargs = _props.routeKwargs;

            var contextKwargs = this.context.getRouteKwargs();
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'kwargs id from store: ',
                    routeKwargs.main.id
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'kwargs id from props: ',
                    kwargs.id
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'kwargs id from context: ',
                    contextKwargs.id
                ),
                _react2.default.createElement(
                    _index.Link,
                    { to: 'subRoute2/' },
                    'relative link'
                ),
                _react2.default.createElement(
                    _index.Route,
                    { path: '^subRoute1/(id=\\d+)/', absName: 'subRoute' },
                    _react2.default.createElement(
                        'div',
                        null,
                        'sub 1',
                        _react2.default.createElement(
                            _index.Link,
                            { to: 'subRoute11/44/' },
                            'relative link sub 1'
                        )
                    )
                ),
                _react2.default.createElement(
                    _index.Route,
                    { path: '^subRoute2/' },
                    _react2.default.createElement(
                        'div',
                        null,
                        'sub 2',
                        _react2.default.createElement(
                            _index.Link,
                            { to: 'subRoute22/' },
                            'relative link sub 2'
                        )
                    )
                )
            );
        }
    }]);

    return _Simple;
}(_react2.default.Component);

;
(0, _index.addRoutingContext)(_Simple);

var Simple = (0, _reactRedux.connect)(function (state) {
    return { routeKwargs: state.routeKwargs };
})(_Simple);

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
        HashHistory,
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h3',
                null,
                'Test Switch in Switch'
            ),
            _react2.default.createElement(
                _index.Switch,
                null,
                _react2.default.createElement(
                    _index.Route,
                    { path: '^/sw1/' },
                    _react2.default.createElement(
                        'div',
                        null,
                        'another switch',
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _index.Switch,
                            null,
                            _react2.default.createElement(
                                _index.Route,
                                { path: '^sw2/' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        _index.Link,
                                        { to: 'test/' },
                                        'test'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _index.Route,
                                null,
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        _index.Link,
                                        { to: 'sw2/' },
                                        'sw2'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _index.Route,
                    null,
                    _react2.default.createElement(
                        _index.Link,
                        { to: 'sw1/' },
                        'sw1'
                    )
                )
            )
        )
    )
), document.getElementById('app'));
//# sourceMappingURL=index.js.map