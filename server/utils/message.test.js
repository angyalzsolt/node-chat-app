const expect = require('expect');


const {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
	it('should generate correct message', () => {
		const from = 'Joc';
		const text = 'Test text';
		const message  = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});


describe('generateLocationMessage', ()=> {
	it('should generate correct location object', ()=> {
		const from = 'Zsolt';
		const lat  = 1;
		const lan = 2;
		const url = 'https://www.google.com/maps?q=1,2';

		const message = generateLocationMessage(from, lat, lan);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, url});

	})
})