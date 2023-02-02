import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Response } from "../models/response.interface";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor(private _http: HttpClient) { }

    baseUrl = environment.baseUrl;

    getUser(size: number): Observable<any> {
        return this._http.get<Response>(this.baseUrl + `/?results=${size}`).pipe(
            map(response => this.processResponse(response))
        )
    }

    getUserById(uuid: string): Observable<any> {
        return this._http.get<any>(this.baseUrl + `/?uuid=${uuid}`).pipe(
            map(response => this.processResponse(response))
        )
    }


    private processResponse(response: Response): Response {
        return {
            info: { ...response.info },
            results: response.results.map(
                user => (<User>{
                    uuid: user.login.uuid,
                    firstName: user.name.first,
                    lastName: user.name.last,
                    email: user.email,
                    username: user.login.username,
                    gender: user.gender,
                    address: `${user.location.street.number} ${user.location.city}, ${user.location.country}`,
                    dateOfBirth: user.dob.date,
                    phone: user.phone,
                    imageUrl: user.picture.medium,
                    coordinates: {
                        latitude: +user.location.coordinates.latitude,
                        longitude: +user.location.coordinates.longitude
                    }
                })
            )
        }
    }
}