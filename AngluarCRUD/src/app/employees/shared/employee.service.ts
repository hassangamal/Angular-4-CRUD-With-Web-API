import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Employee} from'./employee.model'

@Injectable()
export class EmployeeService {

  slelectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }
  getEmployeeList(){
    this.http.get('http://localhost:48797/api/Employee')
    .map((data : Response) =>{
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
    })
  }
  postEmployee(emp : Employee){
    console.log("EMP:" ,emp);
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:48797/api/Employee',body,requestOptions).map(x => x.json());
  }

  putEmployee(id:number, emp:Employee) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:48797/api/Employee/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:48797/api/Employee/' + id).map(res => res.json());
  }
}
