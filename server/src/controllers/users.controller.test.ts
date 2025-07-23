import UsersController from './users.controller';

describe('UsersController', () => {

    describe('getUsers', () => {

        it('should return all users', async () => {
            const request: any = {};
			const response: any = {
                send: jest.fn()
            };

            await UsersController.getUsers(request, response);

			expect(response.send).toHaveBeenCalledWith([
				expect.objectContaining({
					id: expect.any(Number),
					username: 'codewizard42',
					firstName: 'Lena',
					lastName: 'Voss',
					email: 'lena.voss@example.com'
				}),
				expect.objectContaining({
					id: expect.any(Number),
					username: 'danN',
					firstName: 'Daniel',
					lastName: 'Nguyen',
					email: 'dan.nguyen@example.com'
				}),
				expect.objectContaining({
					id: expect.any(Number),
					username: 'pixelpusher',
					firstName: 'Amina',
					lastName: 'Torres',
					email: 'amina.torres@example.com'
				})
			]);
        });
    });
});
