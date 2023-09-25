import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public submited: boolean = false;

  public error: any = {
    incorrectInfo: false,
    message: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    document.body.className = "background-login";

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    console.log(this.registerForm);
  }

  ngOnDestroy(){
      document.body.className="";
    }

    public async register(): Promise<any> {
      this.submited = true;
      if(this.registerForm.invalid) {
        return;
      }

      this.userService.insertUser(this.registerForm.value).subscribe({
        next: (response)=>{
          if(response) {
            this.router.navigate(['login']);
            return;
          }

          this.error.incorrectInfo = true;
          this.error.message = response;
        }
      })


    }

    cpf_mask = document.querySelector("#cpf");

    mascara(i: any) {
      let v = i.value;

      if (isNaN(v[v.length-1])){
        i.value = v.substring(0, v.length-1);
        return;
      }
      i.setAtribute("maxlength","14");
      if (v.length == 3 || v.length == 7) i.value += ".";
      if (v.length == 11) i.value += "-";
    }


  };

