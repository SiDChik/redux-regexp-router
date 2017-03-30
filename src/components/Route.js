/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getRegs, getMatchInfo } from '../helpers/matcher';
import { setCurrentRoute, setRouteKwargs } from '../actions/routing';
import { addRoutingContext } from '../helpers/context';

class Route extends React.Component {
    routeLocation = '/';
    args = [];
    kwargs = {};
    childLocation = null;
    currentMatch = false;

    getSubRouteLocation(_props, _context) {
        let props = _props || this.props;
        let context = _context || this.context;
        if (!props.absolute) return (context.getChildLocation ? context.getChildLocation() : '') || props.routing.location.pathname;

        return props.routing.location.pathname;
    }

    getChildContext() {
        return {
            getChildLocation: this.getChildLocation.bind(this),
            getRouteLocation: this.getRouteLocation.bind(this),
            matchedRoute: this,
            routeArgs: _.cloneDeep(this.args),
            getRouteKwargs: this.getKwargs.bind(this),
            routePath: this.getRoutePath()
        };
    }

    getChildLocation() {
        return this.childLocation;
    }

    getRouteLocation() {
        return this.routeLocation;
    }

    getKwargs() {
        let parentKwargs = this.context.getRouteKwargs ? this.context.getRouteKwargs() : null || {};
        return Object.assign({}, parentKwargs, _.cloneDeep(this.kwargs));
    }

    getRoutePath() {
        let name = this.props.name ? (this.props.name + '/') : '';
        return (this.context.routePath ? this.context.routePath : '') + (name || this.props.path);
    }


    setMatch(flag) {
        this.currentMatch = flag;
        return flag;
    }

    isMatched() {
        if (!this.props.path) return this.setMatch(true);
        let location = this.getSubRouteLocation();

        this.args = [];
        this.kwargs = {};
        let matchInfo = getMatchInfo(location, this.props.path);

        if (!matchInfo) return this.setMatch(false);
        this.args = matchInfo.args;
        this.kwargs = matchInfo.kwargs;
        this.childLocation = matchInfo.childLocation;
        this.routeLocation = (this.context.getRouteLocation ? this.context.getRouteLocation() : '') + matchInfo.matchString;
        return this.setMatch(true);
    }

    componentDidMount() {
        // this.currentMatch = false;
    }

    componentWillMount() {
        this.isMatched();
        this.setMatch(false);
        this.previousKwargs = this.kwargs;
        this.props.dispatch(setRouteKwargs(this.getRoutePath(), this.props.absName, this.getKwargs()));
    }

    componentWillUnmount() {
        this.setMatch(false);
    }

    previousKwargs = {};

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!nextProps.path) return true;
        let location = this.getSubRouteLocation(nextProps, nextContext);

        let matchInfo = getMatchInfo(location, nextProps.path);
        let matched = matchInfo !== false;
        if (matched) {
            this.args = matchInfo.args;
            this.kwargs = matchInfo.kwargs;
            this.childLocation = matchInfo.childLocation;
        }

        let update = this.currentMatch !== matched;
        if (!update && matched) {
            if (!_.isEqual(this.kwargs, this.previousKwargs)) {
                this.previousKwargs = this.kwargs;
                update = true;
                this.props.dispatch(setRouteKwargs(this.getRoutePath(), nextProps.absName, this.getKwargs()));
            }
        }

        if (update) {
            this.props.dispatch(setCurrentRoute(this));
        }
        return update;
    }

    componentWillUpdate() {
        this.props.dispatch(setRouteKwargs(this.getRoutePath(), this.props.absName, this.getKwargs()));
    }

    render() {
        if (this.isMatched()) {
            let updateProps = {};

            if (this.props.path && typeof(this.props.children.type) === 'function') {
                updateProps['kwargs'] = this.getKwargs();
            }

            if (this.props.component) return React.cloneElement(this.props.component, updateProps);

            if (Array.isArray(this.props.children)) return <div
                className={this.props.className}>{this.props.children}</div>;

            if (this.props.children) return React.cloneElement(this.props.children, updateProps);
        }
        return null;
    }
}

Route.childContextTypes = {
    getChildLocation: React.PropTypes.func,
    getRouteLocation: React.PropTypes.func,
    matchedRoute: React.PropTypes.object,
    routeArgs: React.PropTypes.array,
    getRouteKwargs: React.PropTypes.func,
    routePath: React.PropTypes.string,
};


addRoutingContext(Route);
export default connect(state => ({ routing: state.routing }))(Route);