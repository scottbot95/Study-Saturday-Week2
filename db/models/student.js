"use strict";

const Sequelize = require("sequelize");
const db = require("../db");

const upperCaseFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Student = db.define(
  "student",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  },
  {
    hooks: {
      beforeCreate: student => {
        student.firstName = upperCaseFirst(student.firstName);
        student.lastName = upperCaseFirst(student.lastName);
      }
    }
  }
);

module.exports = Student;
