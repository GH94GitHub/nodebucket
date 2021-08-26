/*===============================
; Title: Home Component
; Date: 9 August 2021
; Author: George Henderson
; Description: Class file for 'home' component.
===============================*/

import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item.interface';
import { Employee } from '../../shared/models/employee.interface';
import { TaskService } from '../../shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(res => { //
      console.log('--Server response from findAllTasks API--');
      console.log(res);

      this.employee = res;
      console.log('--Employee Object--');
      console.log(this.employee);
    }, err => { // On Error
      console.log(err);
    }, () => { // On Complete of the findAllTasks service Call
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log('--Todo tasks--');
      console.log(this.todo);

      console.log('--Done tasks--');
      console.log(this.done);
    })
  }

  ngOnInit(): void {
  }

/**
 *
 */
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      console.log('--empId--')
      console.log(this.empId);

      console.log()
      if (data) {
        console.log('--Data Exists--');
        console.log(data);

        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          console.log('--Inside createTask Result--')
          console.log(res);

          this.employee = res;
          console.log('--This.employee--') //! properly assign this.employee
          console.log(this.employee);
        }, err => {
          console.log('--onError of the createTask service call--');
          console.log(err)
        }, () => {
          console.log('--onComplete--')
          this.todo.push(this.employee.todo[0]);
          this.done.push(this.employee.done[0]);
          console.log(this.todo);
          console.log(this.done);
        })
      }
    })
  }
}
