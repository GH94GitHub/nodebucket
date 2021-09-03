/*====================================
; Title: Task Service
; Date: 29 August 2021
; Author: George Henderson
; Description: Service that interacts with API.
====================================*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * Creates an HTTP GET request given the empId
   * @param empId
   * @returns Http GET request observable
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  /**
   * Creates an HTTP POST request given the empId, task
   * @param empId
   * @param task
   * @returns Http POST request observable
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + "/tasks", {
      text: task
    });
  }

  /**
   * Creates an HTTP PUT request givin the empId, and tasks object
   * @param empId
   * @param tasks Contains 'todo' and 'done' Array<Item> fields, will be the body of the request
   * @returns Http PUT request observable
   */
  updateTasks(empId: number, tasks: any) {
    return this.http.put('/api/employees/' + empId + "/tasks", tasks);
  }

  /**
   * Creates an HTTP DELETE request given the empId, and the taskId
   * @param empId
   * @param taskId
   * @returns Http DELETE request observable
   */
  deleteTask(empId: number, taskId: number) {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
