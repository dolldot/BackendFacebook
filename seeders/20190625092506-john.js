'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "John",
      lastName: "Wick",
      email: "john@dolldot.com",
      password: "$2y$12$8BnjKOTAzXhxLClsYj7D2eti.BSd94NZgKRR3J893DFQRQuF3lhnO",
      avatar: "https://aliyula.com/wp-content/uploads/2019/06/johnwick.jpg"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
