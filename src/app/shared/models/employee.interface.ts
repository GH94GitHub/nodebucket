/*====================================
; Title: Employee Interface
; Date: 29 August 2021
; Author: George Henderson
; Description: Employee Interface
====================================*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
