'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _matcher = require('../helpers/matcher');

var _routing = require('../actions/routing');

var _context2 = require('../helpers/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sidchik on 28.03.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Route = function (_React$Component) {
    _inherits(Route, _React$Component);

    function Route(props) {
        _classCallCheck(this, Route);

        var _this = _possibleConstructorReturn(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this, props));

        _this.routeLocation = '/';
        _this.args = [];
        _this.kwargs = {};
        _this.childLocation = null;
        _this.currentMatch = false;
        _this.previousKwargs = {};

        _this.routeLocation = _this.context && _this.context.getRouteLocation ? _this.context.getRouteLocation() : '';
        _this.childLocation = _this.context && _this.context.childLocation ? _this.context.childLocation() : '';
        _this.isMatched();

        _this.previousKwargs = _this.kwargs;
        props.dispatch((0, _routing.setRouteKwargs)(_this.getRoutePath(), props.absName, _this.getKwargs()));
        if (_this.currentMatch) {
            props.dispatch((0, _routing.setCurrentRoute)(_this));
        }
        _this.setMatch(false);
        return _this;
    }

    _createClass(Route, [{
        key: 'getSubRouteLocation',
        value: function getSubRouteLocation(_props, _context) {
            var props = _props || this.props;
            var context = _context || this.context;
            if (!props.absolute && context && context.getChildLocation) return context.getChildLocation();
            if (props.routing && props.routing.location) return props.routing.location.pathname;
            return '';
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                getChildLocation: this.getChildLocation.bind(this),
                getRouteLocation: this.getRouteLocation.bind(this),
                matchedRoute: this,
                routeArgs: _lodash2.default.cloneDeep(this.args),
                getRouteKwargs: this.getKwargs.bind(this),
                routePath: this.getRoutePath()
            };
        }
    }, {
        key: 'getChildLocation',
        value: function getChildLocation() {
            return this.childLocation;
        }
    }, {
        key: 'getRouteLocation',
        value: function getRouteLocation() {
            return this.routeLocation;
        }
    }, {
        key: 'getKwargs',
        value: function getKwargs() {
            var parentKwargs = this.context && this.context.getRouteKwargs ? this.context.getRouteKwargs() : null || {};
            return Object.assign({}, parentKwargs, _lodash2.default.cloneDeep(this.kwargs));
        }
    }, {
        key: 'getRoutePath',
        value: function getRoutePath() {
            var name = this.props.name ? this.props.name + '/' : '';
            return (this.context && this.context.routePath ? this.context.routePath : '') + (name || this.props.path);
        }
    }, {
        key: 'setMatch',
        value: function setMatch(flag) {
            this.currentMatch = flag;
            return flag;
        }
    }, {
        key: 'isMatched',
        value: function isMatched() {
            if (!this.props.path) return this.setMatch(true);
            var location = this.getSubRouteLocation();

            this.args = [];
            this.kwargs = {};
            var matchInfo = (0, _matcher.getMatchInfo)(location, this.props.path);

            if (!matchInfo) return this.setMatch(false);
            this.args = matchInfo.args;
            this.kwargs = matchInfo.kwargs;
            this.childLocation = matchInfo.childLocation;
            this.routeLocation = (this.context && this.context.getRouteLocation ? this.context.getRouteLocation() : '') + matchInfo.matchString;
            return this.setMatch(true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setMatch(false);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            if (!nextProps.path) return true;
            var location = this.getSubRouteLocation(nextProps, nextContext);

            var matchInfo = (0, _matcher.getMatchInfo)(location, nextProps.path);
            var matched = matchInfo !== false;
            if (matched) {
                this.args = matchInfo.args;
                this.kwargs = matchInfo.kwargs;
                this.childLocation = matchInfo.childLocation;
            }

            var update = this.currentMatch !== matched;
            if (!update && matched) {
                if (!_lodash2.default.isEqual(this.kwargs, this.previousKwargs)) {
                    this.previousKwargs = this.kwargs;
                    update = true;
                    this.props.dispatch((0, _routing.setRouteKwargs)(this.getRoutePath(), nextProps.absName, this.getKwargs()));
                }
            }

            if (update) {
                this.props.dispatch((0, _routing.setCurrentRoute)(this));
            }
            return update;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.props.dispatch((0, _routing.setRouteKwargs)(this.getRoutePath(), this.props.absName, this.getKwargs()));
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.isMatched()) {
                var updateProps = {};

                if (this.props.path && typeof this.props.children.type === 'function') {
                    updateProps['kwargs'] = this.getKwargs();
                }

                if (this.props.component) return _react2.default.cloneElement(this.props.component, updateProps);

                if (Array.isArray(this.props.children)) return _react2.default.createElement(
                    'div',
                    {
                        className: this.props.className },
                    this.props.children
                );

                if (this.props.children) return _react2.default.cloneElement(this.props.children, updateProps);
            }
            return null;
        }
    }]);

    return Route;
}(_react2.default.Component);

Route.childContextTypes = {
    getChildLocation: _propTypes2.default.func,
    getRouteLocation: _propTypes2.default.func,
    matchedRoute: _propTypes2.default.object,
    routeArgs: _propTypes2.default.array,
    getRouteKwargs: _propTypes2.default.func,
    routePath: _propTypes2.default.string
};

(0, _context2.addRoutingContext)(Route);
exports.default = (0, _reactRedux.connect)(function (state) {
    return { routing: state.routing };
})(Route);
//# sourceMappingURL=Route.js.map