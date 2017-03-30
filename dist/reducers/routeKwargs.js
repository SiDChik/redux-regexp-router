'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = history;

var _routing = require('../actions/routing');

var initialState = {}; /**
                        * Created by sidchik on 28.03.17.
                        */
function history() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    var payload = action.payload;

    switch (action.type) {
        case _routing.SET_KWARGS_ROUTING:
            var newState = Object.assign({}, state);
            var path = payload.path;
            if (path.substr(-1) == '/') {
                path = path.slice(0, -1);
            }
            newState[path] = payload.kwargs;
            if (payload.absName) {
                newState[payload.absName] = payload.kwargs;
            }
            return newState;
    }
    return state;
}
//# sourceMappingURL=routeKwargs.js.map