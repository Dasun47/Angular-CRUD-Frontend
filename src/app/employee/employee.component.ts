import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.module';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employee: Employee={
    employeeId: 0,
    employeeName: '',
    employeeContactNumber: '',
    employeeAddress: '',
    employeeGender: '',
    employeeDepartment: '',
    employeeSkills: ''
  };

  skills: string[] = [];

  constructor(private employeeService: EmployeeService){

  }
  ngOnInit(): void {
    
  }

  checkSkills(skill: string){
    return this.employee.employeeSkills !=null && this.employee.employeeSkills.includes(skill);
  }
  // checkGender(gender: string){
  //   return this.employee.employeeGender !=null && this.employee.employeeGender == gender;
  // }



  saveEmployee(employeeForm: NgForm):void{
      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next:(res: Employee)=>{
            console.log(res);
            employeeForm.reset();
            this.employee.employeeGender ='';
            this.skills=[];
            this.employee.employeeSkills='';
          },
          error:(err: HttpErrorResponse)=>{
              console.log(err);
          }
        }
      );
  }

  selectGender(gender: string): void{
    this.employee.employeeGender = gender;
  }

  onSkillsChanges(event: any): void{
    if(event.checked){
        this.skills.push(event.source.value);
    }else{
        this.skills.forEach(
          (item,index)=>{
            if(item === event.source.value){
              this.skills.splice(index,1);
            }
          }
        )
    }

    this.employee.employeeSkills = this.skills.toString();
  }

}
