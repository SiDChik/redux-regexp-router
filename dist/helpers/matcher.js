'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMatchInfo = getMatchInfo;
exports.getRegs = getRegs;
/**
 * Created by sidchik on 29.03.17.
 */
var regsCache = {};
var matchCache = {};

var keyed = /^(\w+)\{(.*)\}$/g;

function _getMatchInfo(location, pattern) {
    var regs = getRegs(pattern);
    var args = [];
    var kwargs = {};
    var matchString = '';
    var childLocation = location;
    for (var regIndex in regs) {
        if (!childLocation) return false;
        var reg = regs[regIndex];
        var match = childLocation.match(reg.reg);
        if (match) {
            matchString += childLocation.substring(0, match[0].length + match.index);
            childLocation = childLocation.substring(match[0].length + match.index);
            if (reg.argument && reg.key) kwargs[reg.key] = match[0];
            if (reg.argument && !reg.key) args.push(match[0]);
        } else {
            return false;
        }
    }
    return {
        childLocation: childLocation,
        args: args,
        kwargs: kwargs,
        matchString: matchString
    };
}

function getMatchInfo(location, pattern) {
    var cacheKey = [location, pattern].join('::');
    if (matchCache[cacheKey]) return matchCache[cacheKey];

    matchCache[cacheKey] = _getMatchInfo(location, pattern);
    return matchCache[cacheKey];
}

function getRegs(pattern) {
    if (!regsCache[pattern]) {
        var regStrings = pattern.split(/[\(\)]/);
        if (!regStrings[regStrings.length - 1]) {
            regStrings.pop();
        }

        regStrings = regStrings.map(function (item, index) {
            var match = keyed.exec(item);
            var text = item,
                key = void 0;
            if (match) {
                key = match[1];
                text = match[2];
            }
            return {
                text: text,
                key: key,
                argument: index % 2
            };
        });

        if (regStrings.length > 1 && regStrings[0].text === '^') {
            regStrings.splice(0, 1);
            regStrings[0].text = '^' + regStrings[0].text;
        }

        if (regStrings.length > 1 && regStrings[regStrings.length - 1].text === '$') {
            regStrings.pop();
            var last = regStrings.pop();
            last.text += '$';
            regStrings.push(last);
        }

        // let lastIndex = regStrings.length - 1;
        regsCache[pattern] = regStrings.map(function (item, index) {

            item.reg = new RegExp((index > 0 ? '^' : '') + item.text);
            return item;
        });
    }
    return regsCache[pattern];
}
//# sourceMappingURL=matcher.js.map