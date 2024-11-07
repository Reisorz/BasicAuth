import { Component, DoCheck, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Roles } from '../model/roles';
import { User } from '../model/user';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { ToastrService } from 'ngx-toastr';
import e from 'express';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
})
export class UserlistComponent {
  actionColumn = false;
  roles: Roles[] = [];
  user: User;

  displayedColumns: string[] = [
    'userId',
    'username',
    'name',
    'email',
    'roles',
    'enabled',
  ];
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loadUsers();
    this.displayActionColumn();
  }

  //It adds the action column to displayedColumns if you are an ADMIN.
  displayActionColumn() {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.roles = this.user.roles;
    this.roles.forEach((role) => {
      if (role.roleEnum === 'ADMIN') {
        this.actionColumn = true;
      }
    });
    if (this.actionColumn == true) {
      this.displayedColumns.push('action');
    }
  }

    loadUsers() {

        this.userService.getUsers().subscribe({
          next: (data) => { console.log("getUsers service working!")
            this.userList = data;
            console.log(this.userList);
            this.dataSource = new MatTableDataSource(this.userList);
            this.dataSource.paginator = this.paginator;
          },
          error: (error: any) => {console.log(error)
            this.toastr.error("This user cannot access this data", "Invalid credentials")
          },
        });
  }

  updateUser(userId: number) {
    const dialogRef = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '40vw',
      minWidth: '40vw',
      data: {
        userId: userId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }

  deletePopUp(userId: number){
    const dialogRef = this.dialog.open(DeletepopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '20vw',
      minWidth: '20vw',
      maxWidth: '20vw',
      data: {
        userId: userId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });

  }
}
