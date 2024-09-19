import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.pattern('^[^s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required], this.mustMatch],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  mustMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      console.log(this.registerForm.value);
      Object.keys(this.registerForm.controls).forEach((field) => {
        const control = this.registerForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    console.log(this.registerForm.value);
  }
}
