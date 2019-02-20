const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
	let users;
	beforeEach(()=> {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Zsolt',
			room: 'Gym'
		},{
			id: '2',
			name: 'Joc',
			room: 'Sleep'
		},{
			id: '3',
			name: 'Emi',
			room: 'Gym'
		}];
	});



	it('should remove a user', () => {
		let userId = '1';
		let user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users).toHaveLength(2);
	});

	it('should not remove a user', () => {
		let userId = '99';
		let user = users.removeUser(userId);

		expect(user).toBe(undefined);
		expect(users.users).toHaveLength(3);
	});

	it('should find user', () => {
		let userId = '2';
		let user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});

	it('should not find a user', () => {
		let userId = '99';
		let user = users.getUser(userId);
		expect(user).toBe(undefined);
	});




	it('should add new user', ()=> {
		let users = new Users();
		let user = {
			id: '123',
			name: 'Zsolt',
			room: 'Fight Club'
		};
		let resUse = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	})

	it('should return names for gym room', () => {
		let userList = users.getUserList('Gym');
		expect(userList).toEqual(['Zsolt', 'Emi']);
	});

	it('should return names for sleep room', () => {
		let userList = users.getUserList('Sleep');
		expect(userList).toEqual(['Joc']);
	})
})