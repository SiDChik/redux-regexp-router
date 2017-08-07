'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addToContext = addToContext;
exports.addRoutingContext = addRoutingContext;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by sidchik on 29.03.17.
 */
function addToContext(module, data) {
    if (!module.contextTypes) module.contextTypes = {};
    Object.assign(module.contextTypes, data);
};

function addRoutingContext(module) {
    addToContext(module, {
        getChildLocation: _propTypes2.default.func,
        getRouteLocation: _propTypes2.default.func,
        matchedRoute: _propTypes2.default.object,
        routeArgs: _propTypes2.default.array,
        getRouteKwargs: _propTypes2.default.func,
        routePath: _propTypes2.default.string
    });
};
//# sourceMappingURL=context.js.map