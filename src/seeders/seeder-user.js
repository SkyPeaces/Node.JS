"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "email@gmail.com",
        password: "1234",
        firstName: "firstname01",
        lastName: "lastname01",
        address: "address",
        gender: "F",
        roleId: "roleId",
        phoneNumber: "phonenumber",
        positionId: "positionid",
        image: "image",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
