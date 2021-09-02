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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
 * Opens a dialog box containing a form for users to create a task
 */
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        },
        err => {},
        () => {
          this.todo.push(data);
        })
      }
    })
  }

  /**
   * Event called when an item is dropped inside of a cdkDropList
   * @param e
   */
  drop(e: CdkDragDrop<string[]>) {
    console.log('--Drop Event--');
    console.log(e);

    // If item never moved dropLists nor index, return
    if (e.previousContainer === e.container && e.previousIndex === e.currentIndex) {
      return;
    }
    else {
      // Item was moved to a different location within the same dropList
      if (e.previousContainer === e.container) {
        moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
      }
      // Moved from todo -> done or from done -> todo
      else {
        transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex)
      }
      // Update server state
      this.taskService.updateTasks(this.empId, {
        todo: this.todo,
        done: this.done
      }).subscribe(employee => {
        console.log('--Updated employee--');
        console.log(employee);
      });
    }
  }
}
