"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
          isEmail: true,
          notNull: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      firstName: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      address: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      roleId: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          isNumeric: true,
          len: [4],
        },
      },
      positionId: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
