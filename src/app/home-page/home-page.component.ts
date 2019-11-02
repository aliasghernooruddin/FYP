import { Component, OnInit } from '@angular/core';
import { TwitterAuthService } from '../twitter-auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  username = 'admin@test.com'
  password = 'admin123'
  hide = 'password'
  constructor(private authService: TwitterAuthService, private toastr: ToastrService, private router: Router) { }

  myForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginTwitter() {
    this.authService.TwitterLogin()
  }

  onSubmit(){
    if(this.myForm.value.username == this.username && this.myForm.value.password == this.password){
      localStorage.setItem('allow','true')
      this.router.navigateByUrl('/admin')
    }
    else{
      this.toastr.warning("Incorrect username or password",'Error')
    }
  }


  ngOnInit() {
  }

}
