import StatusesController from './statuses.controller';

describe('StatusesController', () => {

    describe('getStatuses', () => {

        it('should return all statuses', async () => {
            const request: any = {};
            const response: any = {
                send: jest.fn()
            };

            await StatusesController.getStatuses(request, response);

            expect(response.send).toHaveBeenCalledWith([
                expect.objectContaining({ id: expect.any(Number), status: 'TO_DO', label: 'To Do' }),
                expect.objectContaining({ id: expect.any(Number), status: 'IN_PROGRESS', label: 'In Progress' }),
                expect.objectContaining({ id: expect.any(Number), status: 'IN_REVIEW', label: 'In Review' }),
                expect.objectContaining({ id: expect.any(Number), status: 'RESOLVED', label: 'Resolved' }),
                expect.objectContaining({ id: expect.any(Number), status: 'CLOSED', label: 'Closed' }),
                expect.objectContaining({ id: expect.any(Number), status: 'INPUT_REQUIRED', label: 'Input Required' })
            ]);
        });
    });
});
