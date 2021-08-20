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

  form : FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb : FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId : [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  /**
   *
   */
  login(): void {
    const empId = this.form.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe(res => {
      if(res) {

        this.cookieService.set('session_user', empId, 1); // comment
      }
      else {
        this.error = "The employeeId you entered is not valid, please try again.";
      }
    })
  }

}
