'use strict';

const bcrypt = require('bcrypt');

const generatePassword = async () => await bcrypt.hash(Math.floor(Math.random() * 10000).toString(), 10);

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    const users = [
      {
        username: 'codewizard42',
        first_name: 'Lena',
        last_name: 'Voss',
        email: 'lena.voss@example.com',
        password: await generatePassword(),
        created_at: now,
        updated_at: now
      },
      {
        username: 'danN',
        first_name: 'Daniel',
        last_name: 'Nguyen',
        email: 'dan.nguyen@example.com',
		password: await generatePassword(),
        created_at: now,
        updated_at: now
      },
      {
        username: 'pixelpusher',
        first_name: 'Amina',
        last_name: 'Torres',
        email: 'amina.torres@example.com',
		password: await generatePassword(),
        created_at: now,
        updated_at: now
      }
    ];

    return queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
