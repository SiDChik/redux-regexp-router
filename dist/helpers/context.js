'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addToContext = addToContext;
exports.addRoutingContext = addRoutingContext;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addToContext(module, data) {
    if (!module.contextTypes) module.contextTypes = {};
    Object.assign(module.contextTypes, data);
} /**
   * Created by sidchik on 29.03.17.
   */
;

function addRoutingContext(module) {
    addToContext(module, {
        getChildLocation: _react2.default.PropTypes.func,
        getRouteLocation: _react2.default.PropTypes.func,
        matchedRoute: _react2.default.PropTypes.object,
        routeArgs: _react2.default.PropTypes.array,
        getRouteKwargs: _react2.default.PropTypes.func,
        routePath: _react2.default.PropTypes.string
    });
};
//# sourceMappingURL=context.js.map