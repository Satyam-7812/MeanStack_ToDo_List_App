import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss']
})
export class StudentcrudComponent 
{


  StudentArray : any[] = [];
  currentStudentID = "";

  assigned: string ="";
  comment: string ="";
  priority: string ="";
  status: string ="";
  date: string ="";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {

    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.StudentArray = resultData.data;
    });


  }

  setUpdate(data: any) 
  {
   this.assigned = data.assigned;
   this.comment= data.comment;
   this.priority= data.priority;
   this.status= data.status;
   this.date= data.date;

   this.currentStudentID = data._id;
  
  }

  UpdateRecords()
  {
    let bodyData = {
      "assigned" : this.assigned,
      "comment" : this.comment,
      "priority" : this.priority,
      "status" : this.status,
      "date" : this.date,

    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }

register()
  {

    let bodyData = {
      "assigned" : this.assigned,
      "comment" : this.comment,
      "priority" : this.priority,
      "status" : this.status,
      "date" : this.date,
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
         //this.getAllEmployee();
        this.assigned = '';
        this.comment = '';
        this.priority  = '';
        this.status = '';
        this.date = '';
        this.getAllStudent();
    });
  }
}


