/*==============================
; Title: Base-Layout Component
; Date: 9 August 2021
; Author: George Henderson
; Description: Class file for 'base-layout' component.
==============================*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
