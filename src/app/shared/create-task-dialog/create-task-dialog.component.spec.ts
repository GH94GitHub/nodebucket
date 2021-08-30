/*==============================
; Title: Create-Task-Dialog Testing
; Date: 29 August 2021
; Author: George Henderson
; Description: Test suite for 'create-task-dialog' component.
==============================*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskDialogComponent } from './create-task-dialog.component';

describe('CreateTaskDialogComponent', () => {
  let component: CreateTaskDialogComponent;
  let fixture: ComponentFixture<CreateTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
