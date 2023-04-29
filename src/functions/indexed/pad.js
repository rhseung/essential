const type = require('../util/type.js');

/**
 * 객체를 `length`만큼 양쪽으로 패딩합니다.
 * @this {Array | String} 순회할 객체
 * @param {Number} length 패딩할 길이
 * @param {*} [pad=' ', 0] 패딩할 값, 객체가 문자열이면 공백, 배열이면 0이 기본값입니다.
 * @returns {Array | String} 객체를 `length`만큼 `pad`로 채운 값
 * @example
 * _([1, 2, 3]).pad(5); // [0, 1, 2, 3, 0]
 * _('abc').pad(5); // ' abc '
 * _([1, 2, 3]).pad(5, 1); // [1, 1, 2, 3, 1]
 * _('abc').pad(5, '1'); // '1abc1'
 */

function pad(length, pad) { 
    let leftLength = Math.floor((length - this.wrap.length) / 2);
    let rightLength = length - this.wrap.length - leftLength;

    switch (type(this.wrap)) {
        case 'String':
            pad = pad || ' ';

            return this.wrap.length >= length ?
                this.wrap : (new this.constructor(pad)).repeat(leftLength, true) + this.wrap + (new this.constructor(pad)).repeat(rightLength, true);
        case 'Array':
            pad = pad || 0;

            return this.length >= length ?
                this.wrap : (new this.constructor([pad])).repeat(leftLength, true).concat(this.wrap).concat((new this.constructor([pad])).repeat(rightLength, true));
    }
};

module.exports = pad;