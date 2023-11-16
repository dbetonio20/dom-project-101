import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public email: string = '';
  public password: string = '';



  constructor(
    private AuthService: AuthService
  ) { }

  ngOnInit() {}

  public onSubmit(){
    console.log('user',this.email);
    console.log('pass', this.password)
  }

  public logIn(){
    this.AuthService.signIn({
      email: this.email,
      password: this.password
    }).subscribe((data) => console.log('success: data'))
  }
}
