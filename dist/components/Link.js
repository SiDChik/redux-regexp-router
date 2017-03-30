'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _routing = require('../actions/routing');

var _context = require('../helpers/context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by sidchik on 28.03.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Link = function (_React$Component) {
    _inherits(Link, _React$Component);

    function Link() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Link);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.getLink = function () {
            var link = _this.props.to;
            if (_this.props.to.substr(0, 1) !== '/') {
                var parentLocation = _this.context.getRouteLocation ? _this.context.getRouteLocation() : '';
                link = parentLocation + link;
            }
            return link;
        }, _this.getHrefLink = function () {
            var link = _this.getLink();
            if (_this.props.routing.historyType == 'hash') link = '#' + link;
            return link;
        }, _this.onClick = function (ev) {
            ev.preventDefault();
            _this.props.dispatch((0, _routing.pushPath)(_this.getLink()));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Link, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'a',
                { href: this.getHrefLink(), onClick: this.onClick },
                this.props.children
            );
        }
    }]);

    return Link;
}(_react2.default.Component);

(0, _context.addRoutingContext)(Link);

exports.default = (0, _reactRedux.connect)(function (state) {
    return { routing: state.routing };
})(Link);
//# sourceMappingURL=Link.js.map