import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserDashboardComponent implements OnInit {
  id: string;
  userData: any;
  type = 'pie';
  features = []
  data = {
    labels: ["Politics", "Drinking", "Racing", "Sports", "Violence"],
    datasets: [
      {
        label: "Features",
        data: this.features
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };  

  constructor(private route: ActivatedRoute, private http: HttpClient, private _location: Location) {
  }

  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('username')
    this.http.get('http://localhost:5000/getUserData/' + this.id).subscribe(response => {
      this.userData = response
      this.features.push(response['P'])
      this.features.push(response['D'])
      this.features.push(response['R'])
      this.features.push(response['S'])
      this.features.push(response['V'])
    })
  }

}
