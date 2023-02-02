import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Response } from '../models/response.interface';
import { userService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Response> {

  constructor(private userService: userService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Response> {
    return this.userService.getUserById(route.paramMap.get('uuid')!)
  }
}
