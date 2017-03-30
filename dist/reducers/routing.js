'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = history;

var _routing = require('../actions/routing');

var initialState = {
    history: null,
    location: null,
    query: null,
    state: null
}; /**
    * Created by sidchik on 28.03.17.
    */
function history() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _routing.SET_ROUTING:
            return Object.assign({}, state, action.payload);
        case _routing.PUSH_ROUTING:
            state.history.push(action.payload.path, action.payload.state);
            break;
    }
    return state;
}
//# sourceMappingURL=routing.js.map