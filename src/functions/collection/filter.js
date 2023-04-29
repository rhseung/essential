const type = require('../util/type.js');

/**
 * 객체의 요소를 조건에 맞게 필터링합니다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Function} condition 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key)
 * @returns {Set | String | Array | Map | Object} 조건에 맞는 요소들로 이루어진 객체
 * @example
 * _([1, 2, 3]).filter(e => e > 1); // [2, 3]
 * _('abc').filter(e => e > 'a'); // 'bc'
 * _({ a: 1, b: 2, c: 3 }).filter((v, k) => v > 1); // { b: 2, c: 3 }
 */

function filter(condition) {
    let ret;
    
    switch (type(this.wrap)) {
        case 'set':
            ret = new Set();
            this.each(e => {
                if (condition(e)) {
                    ret.add(e);
                }
            });
            break;
        case 'string':
            ret = '';
            this.each((e, i) => {
                if (condition(e, i)) {
                    ret += e;
                }
            });
            break;
        case 'array':
            ret = [];
            this.each((e, i) => {
                if (condition(e, i)) {
                    ret[ret.length] = e;
                }
            });
            break;
        case 'map':
            ret = new Map();
            this.each((v, k) => {
                if (condition(v, k)) {
                    ret.set(k, v);
                }
            });
            break;
        case 'object':
            ret = {};
            this.each((v, k) => {
                if (condition(v, k)) {
                    ret[k] = v;
                }
            });
            break;
    }

    return ret;
};

module.exports = filter;