const type = require('../util/type.js');

/**
 * 객체의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 객체를 반환합니다.
 * @alias transform
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} transformer 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Array | Set | String | Map | Object} 각 요소에 대해 `transformer`를 호출한 결과를 모은 배열
 * @example
 * _([1, 2, 3]).map(e => e * 2); // [2, 4, 6]
 * _('abc').map(e => e.toUpperCase()); // 'ABC'
 * _({ a: 1, b: 2, c: 3 }).map((v, k) => v * 2); // { a: 2, b: 4, c: 6 }
 */

function map(transformer) {
    let ret;
    
    switch (type(this.wrap)) {
        case 'set':
            ret = new Set();
            this.each(e => {
                ret.add(transformer(e));
            });
            break;
        case 'string':
            ret = '';
            this.each((e, i) => {
                let t = transformer(e, i);
                ret = this.wrap.substring(0, i) + t + this.wrap.substring(i + t.length);
            });
            break;
        case 'array':
            ret = [];
            this.each((e, i) => {
                ret[i] = transformer(e, i);
            });
            break;
        case 'map':
            ret = new Map();
            this.each((v, k) => {
                ret.set(k, transformer(v, k));
            });
            break;
        case 'object':
            ret = {};
            this.each((v, k) => {
                ret[k] = transformer(v, k);
            });
            break;
    }

    return ret;
};

module.exports = map;