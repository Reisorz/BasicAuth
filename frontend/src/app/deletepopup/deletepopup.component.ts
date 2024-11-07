import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-deletepopup',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './deletepopup.component.html',
  styleUrl: './deletepopup.component.css'
})
export class DeletepopupComponent {

  
  user: User = new User;

  constructor(private router: Router, private toastr: ToastrService, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { userId: number }){
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserById(this.data.userId).subscribe({
      next: (data) => {this.user = data},
      error: (error: any) => console.log(error)
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.user.userId).subscribe({
      next: (data) => this.toastr.success(`The user ${this.user.username} has been deleted succesfully!`,"User deleted!"),
      error: (error:any) => console.log(error)
    })
  }

}
