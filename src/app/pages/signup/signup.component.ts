import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  hide = true;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    student: new FormControl('', []),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSignUp() {
    this.loading = true;
    this.authService
      .signup(
        this.signUpForm.get('email')?.value,
        this.signUpForm.get('password')?.value
      )
      .then((cred) => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value,
          name: {
            firstName: this.signUpForm.get('name.firstName')?.value,
            lastName: this.signUpForm.get('name.lastName')?.value,
          },
          student: this.signUpForm.get('student')?.value as boolean ? true : false,
        };
        this.userService.create(user).then(_ => {
          console.log('User added successfully');
        }).catch(error => {
          console.error(error);
        });

        this.router.navigateByUrl('/movies');
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }
}
