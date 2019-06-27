'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "Mr.",
      lastName: "Bean",
      email: "bean@dolldot.com",
      password: "$2y$12$qYbz6TDut/OEdT5IoQLWS.opsJutawAaVrFOt3X6aroEv2pPesdJW",
      avatar: "https://aliyula.com/wp-content/uploads/2019/06/story.jpg"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
