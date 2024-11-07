import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usernameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);


  user: User = new User;
  userDB: User = new User;
  loginForm: FormGroup;


  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, 
    private userService: UserService, private roleService: RoleService) {

    sessionStorage.clear();
    
    this.loginForm = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    })
  }

  loginUser() {
    if(this.loginForm.valid) {
      this.userService.getUserByUsername(this.user.username).subscribe({
        next: (data) => { 
          this.userDB = data;
          //Set the password as the entered in the login because we will have to store it in the sessionStorage to compare it in later requests with the encoder.
          this.userDB.password = this.user.password;
  
          if(this.userDB == null) {
            this.toastr.error("This user is not registered.", "User does not exist.");
            return;
          }
  
          console.log("User logging: " + this.user.password + this.user.username);
  
          // Checks if entered password matches with the encoded one in the database
          this.userService.loginPass(this.user).subscribe({
            next: (isPasswordCorrect: boolean) => {
              console.log("Login Password match result: " + isPasswordCorrect);
              if(!isPasswordCorrect) {
                this.toastr.error("Password does not match this user.", "Incorrect password.");
                return;
              }
  
              
              if(this.userDB.enabled && this.userDB.accountNonExpired && this.userDB.accountNonLocked && this.userDB.credentialsNonExpired) {
                sessionStorage.setItem("username", this.userDB.username);
                sessionStorage.setItem("user", JSON.stringify(this.userDB));
                this.router.navigate(['/userlist']);
              } else {
                this.toastr.error("User is not active, contact the Admin.", "Inactive user.");
              }
            },
            error: (error: any) => console.log(error)
          });
        },
        error: (error: any) => console.log(error)
      });
    }
  }



}
