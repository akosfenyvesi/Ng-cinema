import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  hide = true;
  firstName: string = "";
  lastName: string = "";

  user: User | undefined;

  changeEmail = new FormGroup({
    email: new FormControl(''),
  });

  changeName = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(private userService: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe((data) => {
      this.user = data;
      this.firstName = this.user?.name.firstName as string;
      this.lastName = this.user?.name.lastName as string;
    }, (error) => {
      console.error(error);
    });
  }

  onChangeEmail() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if (this.user != undefined && this.user.email != this.changeEmail.get('email')?.value && this.changeEmail.get('email')?.value != "") {
      this.user.email = this.changeEmail.get('email')?.value;
      this.userService.update(this.user).then(_ => {
        alert('Email updated successfully! Unfortunately, login email is still your old one :(');
      }).catch(error => {
        alert(error)
      });
      /*user.updateEmail(this.changeEmail.get('email')?.value).then(_ => {}).catch(error => {
        console.error(error);
      });*/
    }
  }

  onChangeName() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;

    if (this.user != undefined) {
      if (this.changeName.get('firstName')?.value != "")  this.user.name.firstName = this.changeName.get('firstName')?.value;
      if (this.changeName.get('lastName')?.value != "") this.user.name.lastName = this.changeName.get('lastName')?.value;
      this.userService.update(this.user).then(_ => {
        alert('Data updated successfully!');
      }).catch(error => {
        alert(error);
      });
    }
    
  }

  onCancel() {
    window.location.reload();
  }
}
