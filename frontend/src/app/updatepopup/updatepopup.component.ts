import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { Roles } from '../model/roles';

@Component({
  selector: 'app-updatepopup',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './updatepopup.component.html',
  styleUrl: './updatepopup.component.css'
})
export class UpdatepopupComponent {

    //Form validators
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    usernameFormControl = new FormControl('', Validators.required);
    nameFormControl = new FormControl('', Validators.required);
    rolesFormControl = new FormControl<Roles[]>([], Validators.required);
    passwordFormControl = new FormControl('');
    accountNonExpiredFormControl = new FormControl(true,Validators.required);
    accountNonLockedFormControl = new FormControl(true,Validators.required);
    credentialsNonExpiredFormControl = new FormControl(true,Validators.required);
    enabledFormControl = new FormControl(true,Validators.required);
    
    
    user: User = new User;
    updateForm: FormGroup;
    rolesList: Roles[] = [];

    constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router, 
      private userService: UserService, private roleService: RoleService, @Inject(MAT_DIALOG_DATA) public data: { userId: number }) {
        
      this.updateForm = new FormGroup({
        username: this.usernameFormControl,
        name: this.nameFormControl,
        email: this.emailFormControl,
        password: this.passwordFormControl,
        accountNonExpired: this.accountNonExpiredFormControl,
        accountNonLocked: this.accountNonLockedFormControl,
        credentialsNonExpired: this.credentialsNonExpiredFormControl,
        enabled: this.enabledFormControl,
        roles: this.rolesFormControl
      })
      this.loadRoles();
      this.loadUser();
      
    }

    loadRoles() {
      this.roleService.getRoles().subscribe({
        next: (data) => this.rolesList = data,
        error: (error:any) => console.log(error)
      })
    }

    loadUser() {
      this.userService.getUserById(this.data.userId).subscribe({
        next: (data) => {this.user = data,
          this.setFormValues(),
          console.log(this.user)},
        error: (error: any) => console.log(error)
      })
    }

    //Assigns values from the loaded user to the form values.
    setFormValues(){
      this.usernameFormControl.setValue(this.user.username);
      this.emailFormControl.setValue(this.user.email);
      this.passwordFormControl.setValue(this.user.password);
      this.nameFormControl.setValue(this.user.name);
      this.accountNonExpiredFormControl.setValue(this.user.accountNonExpired);
      this.credentialsNonExpiredFormControl.setValue(this.user.credentialsNonExpired);
      this.accountNonLockedFormControl.setValue(this.user.accountNonLocked);
      this.enabledFormControl.setValue(this.user.enabled);
      this.rolesFormControl.setValue(this.user.roles);
    }

    //Compares roles from rolesList and user.roles, and selects those coincident
    compareRoles(role1: Roles, role2: Roles): boolean {
      return role1 && role2 ? role1.roleEnum === role2.roleEnum : role1 === role2;
    }


    editUser(){

    
      const formValues = this.updateForm.getRawValue();

      this.user.username = formValues.username;
      this.user.email = formValues.email;
      this.user.password = formValues.password;
      this.user.name = formValues.name;
      this.user.accountNonExpired = formValues.accountNonExpired;
      this.user.credentialsNonExpired = formValues.credentialsNonExpired;
      this.user.accountNonLocked = formValues.accountNonLocked;
      this.user.enabled = formValues.enabled;
      this.user.roles = formValues.roles; 
      
      this.user.roles.forEach(role => {
        console.log("User to update: " + role.roleEnum);
      });
      


      this.userService.editUser(this.user).subscribe({
        next: (data) => {console.log("Submitting this: " + data.roles);
          this.toastr.success('User has been updated succesfully!','Changes saved')},
        error: (error: any) => console.log(error)
      })
    }
    

}
