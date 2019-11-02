import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
  })
};


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  data:any

  displayedColumns: string[] = ['name', 'location', 'username', 'tweets','actions'];
  
  dataSource = new MatTableDataSource();
  
  constructor(private httpClient: HttpClient, private route:Router) {

    this.httpClient.get('http://localhost:5000/getData', httpOptions).subscribe(response => {
      this.data = response
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    localStorage.clear()
    this.route.navigateByUrl('/')
  }  

  ngOnInit() {
  }

}
