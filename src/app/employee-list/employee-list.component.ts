import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.module';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];

  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress', 'employeeDepartment', 'employeeGender', 'employeeSkills', 'edit', 'delete'];

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.getEmployeeList();
  }
  ngOnInit(): void {

  }

  updateEmployee(employeeId: number): void {
    this.router.navigate(["/employee", { employeeId: employeeId }])
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
