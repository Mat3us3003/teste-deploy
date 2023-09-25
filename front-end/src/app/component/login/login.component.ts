import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;
  public submited: boolean = false;

  public error: any = {
    incorrectInfo: false,
    message: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  ngOnInit() {
    document.body.className = "background-login";

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(){
    document.body.className="";
  }

  login() {
    this.submited = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if(response.login == true) {
          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('userType', response.type);
    
          this.router.navigate(['/home']);
          return;
        }
    
        this.error.incorrectInfo = true;
        this.error.message = response.message;
      }
    });
  }

}
