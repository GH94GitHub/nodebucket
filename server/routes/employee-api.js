/*==================================
; Title: Employee API
; Date: 16 August 2021
; Author: George Henderson
; Description: API requests to '/api/employees'.
==================================*/

/**
 * Require statements
 */
const express = require('express');
const Employee = require('../models/employee');

/**
 * Variables
 */
const router = express.Router();

/**
 * GET /api/employees/:empId
 */
router.get('/:empId', async (req, res) => {
  try
  {
    // Find the employee with the provided 'empId'
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      // If error
      if (err)
      {
        console.log(err);
        // Send internal server error, with the message
        res.status(500).send({
          'message':'MongoDB server error: ' + err.message
        })
      }
      // If query was successful
      else
      {
        console.log(employee);
        // Send back the find in JSON
        res.json(employee);
      }
    });
  }
  catch (e)
  {
    console.log(e);
    // Send internal server error, with the message
    res.status(500).send({
      'message':"Internal server error: " + e.message
    })
  }
});

module.exports = router;
