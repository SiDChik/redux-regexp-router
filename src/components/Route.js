/**
 * Created by sidchik on 28.03.17.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const keyed = /^(\w+)\{(.*)\}$/g;

class Route extends React.Component {
    state = {
        locationPath: this.getRouteLocation(),
        matched: this.isMatched()
    };

    getRouteLocation() {
        if (!this.props.absolute) return this.context.locationPath || this.props.routing.location.pathname;

        return this.props.routing.location.pathname;
    }

    getChildContext() {
        return {
            locationPath: this.childLocation,
            matchedRoute: this,
            routeArgs: _.cloneDeep(this.args),
            routeKwargs: _.cloneDeep(this.kwargs),
            routePath: this.getRoutePath()
        };
    }

    getRoutePath() {
        return (this.context.routePath ? this.context.routePath + '/' : '') + (this.props.name || this.props.path);
    }

    routeRegs = null;
    arg = [];
    kwargs = {};
    childLocation = null;

    isMatched() {
        var regs = this.getRegex();
        let location = this.getRouteLocation();

        this.args = [];
        this.kwargs = {};
        for (let regIndex in regs) {
            if (!location) return false;
            let reg = regs[regIndex];
            let match = location.match(reg.reg);
            if (match) {
                location = location.substring(match[0].length + match.index);
                if (reg.argument && reg.key) this.kwargs[reg.key] = match[0];
                if (reg.argument && !reg.key) this.args.push(match[0]);
            } else {
                return false;
            }

        }
        this.childLocation = location;
        return true;
    }

    getRegex() {
        if (!this._regs) {
            let regStrings = this.props.path.split(/[\(\)]/);
            if (!regStrings[regStrings.length - 1]) {
                regStrings.pop();
            }

            regStrings = regStrings.map((item, index) => {
                let match = keyed.exec(item);
                let text = item, key;
                if (match) {
                    key = match[1];
                    text = match[2];
                }
                return {
                    text: text,
                    key: key,
                    argument: index % 2
                }
            });

            if (regStrings.length > 1 && regStrings[0].text === '^') {
                regStrings.splice(0, 1);
                regStrings[0].text = '^' + regStrings[0].text;
            }

            if (regStrings.length > 1 && regStrings[regStrings.length - 1].text === '$') {
                regStrings.pop();
                let last = regStrings.pop();
                last.text += '$';
                regStrings.push(last);
            }

            let lastIndex = regStrings.length - 1;

            this._regs = regStrings.map((item, index) => {

                item.reg = new RegExp((index > 0 ? '^' : '') + item.text);
                return item;
            });
        }
        return this._regs;
    }

    getChildLocation() {
        return this.state.locationPath;
    }


    render() {
        if (this.isMatched()) {
            if (Array.isArray(this.props.children)) return <div>{this.props.children}</div>;
            if (this.props.children) return React.Children.only(this.props.children);
        }
        return null;
    }
}

Route.childContextTypes = {
    locationPath: React.PropTypes.string,
    matchedRoute: React.PropTypes.object,
    routeArgs: React.PropTypes.array,
    routeKwargs: React.PropTypes.object,
    routePath: React.PropTypes.string,
};

Route.contextTypes = {
    locationPath: React.PropTypes.string,
    matchedRoute: React.PropTypes.object,
    routeArgs: React.PropTypes.array,
    routeKwargs: React.PropTypes.object,
    routePath: React.PropTypes.string,
};

export default connect(state => ({routing: state.routing}))(Route);