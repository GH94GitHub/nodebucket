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

/**
 * POST /api/employees/:empId/tasks
 */
router.post('/:empId/tasks', async (req, res) => {
  try {
    // Construct a task object and fill it
    const task = {
      text: req.body.text
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

/**
 * GET /api/employees/:empId/tasks
 */
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

/**
 * PUT /api/employees/:empId/tasks
 * Reinitializes the todo and done arrays with body of request
 * TODO: Build/test client consumption
 */
router.put('/:empId/tasks', async (req, res) => {

  try {
    const filter = { empId: req.params.empId }
    let update = {}

    if(req.body.todo) {
      update.todo = req.body.todo;
    }
    if(req.body.done) {
      update.done = req.body.done;
    }
    // If neither of these items are provided send error?

    Employee.findOneAndUpdate(filter, update, {'new': true}, (err, employee) => {
      // Error
      if (err) {
        console.log(err);
        res.status(500).send({
          message: 'MongoDB server error ' + err.message
        })
      }
      // Success
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
    });
  }
});

/**
 * DELETE /api/employees/:empId/tasks/:taskId
 */
router.delete('/:empId/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const filter = {
      empId: req.params.empId
    };
    const update = {
      $pull: {
        todo: {
          _id: taskId
        },
        done: {
          _id: taskId
        }
      }
    }

    // Find the Employee
    Employee.findOneAndUpdate( filter, update, { 'new': true }, (err, employee) => {
      // Error
      if (err) {
        console.log(err);
        res.status(500).send({
          message: 'MongoDB server error ' + err.message
        });
      }
      // Success
      else {
        console.log('-- New Employee--');
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
    });
  }
});



module.exports = router;
