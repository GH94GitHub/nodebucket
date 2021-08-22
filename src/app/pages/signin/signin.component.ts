/*===============================
; Title: Sign-in Component
; Date: 18 August 2021
; Author: George Henderson
; Description: Class file for 'sign-in' component.
===============================*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // Variables
  form : FormGroup;
  error: string;

  // Inject Router, CookieService, FormBuilder, HttpClient
  constructor(private router: Router, private cookieService: CookieService, private fb : FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {

    // Build the 'form'
    this.form = this.fb.group({
      empId : [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  /**
   * Logs the user in given the input in the sign-in form.
   */
  login(): void {
    // Gets the user input from the form control
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res => {

      // If user entered correct 'empId'
      if(res) {
        // Set user cookie to expire in 24 hours.
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      else {
        this.error = "The employeeId you entered is not valid, please try again.";
      }
    })
  }

}
