const expect = require('expect');


const {generateMessage} = require('./message');


describe('generateMessage', () => {
	it('should generate correct message', () => {
		const from = 'Joc';
		const text = 'Test text';
		let message  = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	})
})