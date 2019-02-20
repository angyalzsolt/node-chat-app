const expect = require('expect');
const {isRealString} = require('./validation');



describe('isRealString', () => {
	it('should reject non-string values', () => {
		let res = isRealString(1);
		expect(res).toBe(false);
	});

	it('Should reject string with only spaces', () => {
		let res = isRealString('       ');
		expect(res).toBe(false);
	});


	it('should allow string with non-space characters', () => {
		let res = isRealString('  Zsolt  ');
		expect(res).toBe(true);
	});
});