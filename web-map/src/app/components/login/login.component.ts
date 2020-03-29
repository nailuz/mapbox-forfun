import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  get form() { return this.loginForm.controls; }

  constructor(
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }

  realizarLogin(): void {
    // CHAMA A API

    const email = 'renan@gmail.com';
    const senha = '123456';

    if (email === this.loginForm.value.email && senha === this.loginForm.value.senha) {
      console.log('voce será redirecionado ..');
      this.router.navigateByUrl('/home');
    } else {
      console.log('credenciais invalidas');
    }

  }

}
