import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.module';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];

  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress', 'employeeDepartment', 'employeeGender', 'employeeSkills', 'delete'];

  constructor(private employeeService: EmployeeService) {
    this.getEmployeeList();
  }
  ngOnInit(): void {

  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployeeById(employeeId).subscribe(
      {
        next: (res) => {
          this.getEmployeeList();
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  getEmployeeList(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          this.dataSource = res;

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
