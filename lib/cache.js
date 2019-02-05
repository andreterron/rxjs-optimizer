"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DEFAULT_CACHE_OPTIONS = {
    key: (a) => '' + a,
    cacheSize: 10
};
function cacheWithOptions(options) {
    let cacheMap = {};
    let keyQueue = [];
    let { key, cacheSize } = Object.assign({}, DEFAULT_CACHE_OPTIONS, options);
    return (...ops) => {
        return operators_1.switchMap(sourceData => {
            let input = rxjs_1.of(sourceData);
            let k = key(sourceData);
            let addToCache = operators_1.tap(v => {
                let index = keyQueue.indexOf(k);
                if (index !== -1) {
                    keyQueue.splice(index, 1);
                }
                while (keyQueue.length >= cacheSize) {
                    let deleteKey = keyQueue.shift();
                    if (deleteKey)
                        delete cacheMap[deleteKey];
                }
                cacheMap[k] = v;
                keyQueue.push(k);
            });
            return rxjs_1.concat(cacheMap[k] ? rxjs_1.of(cacheMap[k]) : rxjs_1.empty(), input.pipe.apply(input, [...ops, addToCache]));
        });
    };
}
function cachePipe(...ops) {
    let c = cacheWithOptions(DEFAULT_CACHE_OPTIONS);
    return c.apply(c, [...ops]);
}
exports.cachePipe = cachePipe;
cachePipe.options = (options) => {
    return cacheWithOptions(options);
};
