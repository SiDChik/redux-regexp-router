/**
 * Created by sidchik on 29.03.17.
 */
let regsCache = {};
let matchCache = {};

const keyed = /^(\w+)\{(.*)\}$/g;

function _getMatchInfo(location, pattern) {
    let regs = getRegs(pattern);
    let args = [];
    let kwargs = {};
    let matchString = '';
    let childLocation = location;
    for (let regIndex in regs) {
        if (!childLocation) return false;
        let reg = regs[regIndex];
        let match = childLocation.match(reg.reg);
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
        matchString: matchString,
    }
}

export function getMatchInfo(location, pattern) {
    const cacheKey = [location, pattern].join('::');
    if (matchCache[cacheKey]) return matchCache[cacheKey];

    matchCache[cacheKey] = _getMatchInfo(location, pattern);
    return matchCache[cacheKey];
}

export function getRegs(pattern) {
    if (!regsCache[pattern]) {
        let regStrings = pattern.split(/[\(\)]/);
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

        // let lastIndex = regStrings.length - 1;
        regsCache[pattern] = regStrings.map((item, index) => {

            item.reg = new RegExp((index > 0 ? '^' : '') + item.text);
            return item;
        });
    }
    return regsCache[pattern];
}