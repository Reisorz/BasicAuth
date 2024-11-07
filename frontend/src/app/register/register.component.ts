import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { error } from 'console';
import { Roles } from '../model/roles';
import { RoleService } from '../services/role.service';

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  
  //Form validators
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', Validators.required);
  nameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.compose([Validators.required, 
    Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')]));

  user: User = new User;
  registerForm: FormGroup;


  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, 
    private userService: UserService, private roleService: RoleService) {

    this.registerForm = new FormGroup({
      username: this.usernameFormControl,
      name: this.nameFormControl,
      email: this.emailFormControl,
      password: this.passwordFormControl
    })

    this.user.accountNonExpired = true;
    this.user.accountNonLocked = true;
    this.user.credentialsNonExpired = true;
    this.user.enabled = false;
    this.user.roles = [];
  }

  ngOnInit() {
    //Assigning USER role for new users.
    this.roleService.getRoleById(2).subscribe({
      next:(data) => this.user.roles.push(data),
      error: (error:any) => console.log(error)
    }); 
    console.log(this.user)
  }



  registerUser() {
    console.log(this.user);
    if(this.registerForm.valid) {
          this.userService.registerUser(this.user).subscribe(
      {
        next:(data) => {this.goToLogin();
          this.toastr.success('Admin will enable your account in a few days.', 'Registered succesfully');
        },
        error: (error:any) => {console.log(error)}
      })
    }
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
