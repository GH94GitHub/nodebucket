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

router.post('/:empId/tasks', async (req, res) => {
  try {
    // Construct a task object and fill it
    const task = {
      text: req.params.text
    }

    Employee.findOneAndUpdate({ empId: req.params.empId }, { $push: { todo: task } }, function(err, employee) {
      // Error
      if(err) {
        console.log(err);
        res.status(500).send({
          'message': 'MongoDB server error ' + err.message
        });
      }
      // Successful
      else {
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch(e) {
    console.log(e);
    // Send internal server error, with the message
    res.status(500).send({
      'message':"Internal server error: " + e.message
    })
  }
});

router.get('/:empId/tasks', async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, async (err, employee) => {
      // Error
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'MongoDB server error ' + err.message
        });
      }
      // Successful
      else {
        let tasks = {
          todo: employee.todo,
          done: employee.done
        }

        console.log(tasks);
        res.json(tasks);
      }
    })
  }
  catch(e) {
    console.log(e);
    // Send internal server error, with the message
    res.status(500).send({
      'message':"Internal server error: " + e.message
    })
  }
});

module.exports = router;
