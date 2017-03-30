'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Route = require('./Route');

var _Route2 = _interopRequireDefault(_Route);

var _matcher = require('../helpers/matcher');

var _reactRedux = require('react-redux');

var _context = require('../helpers/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sidchik on 28.03.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Switch = function (_React$Component) {
    _inherits(Switch, _React$Component);

    function Switch() {
        _classCallCheck(this, Switch);

        return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
    }

    _createClass(Switch, [{
        key: 'getRouteLocation',
        value: function getRouteLocation() {
            if (!this.props.absolute) return (this.context.getChildLocation ? this.context.getChildLocation() : '') || this.props.routing.location.pathname;

            return this.props.routing.location.pathname;
        }
    }, {
        key: 'render',
        value: function render() {
            var childrens = _react2.default.Children.toArray(this.props.children);

            var lastIndex = childrens.length - 1;
            for (var childIndex in childrens) {
                var childIndex = parseInt(childIndex);
                var child = childrens[childIndex];
                if (child.type.WrappedComponent.name === 'Route') {
                    var props = child.props;

                    var kwargs = this.context.getRouteKwargs ? this.context.getRouteKwargs() : {};

                    if (!props.path && childIndex === lastIndex) {
                        // Not Found Route
                        return _react2.default.cloneElement(child, { kwargs: kwargs });
                    }

                    if ((0, _matcher.getMatchInfo)(this.getRouteLocation(), props.path)) {
                        return _react2.default.cloneElement(child, { kwargs: kwargs });
                    }
                } else {
                    console.error('Switch accepts only Route children');
                }
            }

            return null;
        }
    }]);

    return Switch;
}(_react2.default.Component);

(0, _context.addRoutingContext)(Switch);

exports.default = (0, _reactRedux.connect)(function (state) {
    return { routing: state.routing };
})(Switch);
//# sourceMappingURL=Switch.js.map