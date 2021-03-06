'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._setRouting = _setRouting;
exports.pushPath = pushPath;
exports.setRouteKwargs = setRouteKwargs;
exports.setCurrentRoute = setCurrentRoute;
/**
 * Created by sidchik on 28.03.17.
 */
var SET_ROUTING = exports.SET_ROUTING = 'SET_ROUTING';
var SET_CURRENT_ROUTE = exports.SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
var PUSH_ROUTING = exports.PUSH_ROUTING = 'PUSH_ROUTING';
var SET_KWARGS_ROUTING = exports.SET_KWARGS_ROUTING = 'SET_KWARGS_ROUTING';

function _setRouting(payload) {
    return { type: SET_ROUTING, payload: payload };
}

function pushPath(path, state) {
    return {
        type: PUSH_ROUTING, payload: {
            path: path,
            state: state
        }
    };
}

function setRouteKwargs(path, name, kwargs) {
    return {
        type: SET_KWARGS_ROUTING, payload: {
            path: path,
            absName: name,
            kwargs: kwargs
        }
    };
}

function setCurrentRoute(route) {
    return {
        type: SET_CURRENT_ROUTE, payload: {
            currentRoute: route
        }
    };
}
//# sourceMappingURL=routing.js.map