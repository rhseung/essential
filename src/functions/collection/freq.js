/**
 * 객체의 요소들의 빈도수를 반환한다.
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @returns {Object} 빈도수를 담은 객체
 * @example
 * _([0, 1, 2, 3, 0, 1, 2, 3]).freq(); // Map { 0 => 2, 1 => 2, 2 => 2, 3 => 2 }
 * _('abcacbc').freq(); // Map { a => 2, b => 2, c => 3 }
 */

module.exports = function () {
    let ret = new Map();

    this.each(v => {
        if (ret.has(v)) ret.set(v, ret.get(v) + 1);
        else ret.set(v, 1);
    });
    return ret;
}