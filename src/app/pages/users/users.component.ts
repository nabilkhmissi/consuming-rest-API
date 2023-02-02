import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response.interface';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _users: userService) { }

 
  response! : Response;

  ngOnInit(): void {
    this._users.getUser(15).subscribe(
      response => {
        this.response = response
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('done getting users !')
      }
    )
  }

}
