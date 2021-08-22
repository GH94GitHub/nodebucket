/*==================================
; Title: Employee Model
; Date: 16 August 2021
; Author: George Henderson
; Description: Contains the mongoose model for the employee.
=================================*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  empId: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String }
}, { collection: 'employees'});

module.exports = mongoose.model('Employee', employeeSchema)
