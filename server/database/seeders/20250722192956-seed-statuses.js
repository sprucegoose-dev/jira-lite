'use strict';

module.exports = {
    up: async (queryInterface) => {
        const statuses = [
			{
				status: 'TO_DO',
				label: 'To Do'
			},
			{
				status: 'IN_PROGRESS',
				label: 'In Progress'
			},
			{
				status: 'IN_REVIEW',
				label: 'In Review'
			},
			{
				status: 'RESOLVED',
				label: 'Resolved'
			},
			{
				status: 'CLOSED',
				label: 'Closed'
			},
			{
				status: 'INPUT_REQUIRED',
				label: 'Input Required'
			}
		];
        return queryInterface.bulkInsert('statuses', statuses);
    },
    down: (queryInterface) => {
return queryInterface.bulkDelete('statuses', null, {});
    }
};
