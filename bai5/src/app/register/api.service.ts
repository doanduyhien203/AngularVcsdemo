import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
    providedIn:"root",
})
export class ApiService {
    constructor(){}
    validateUsername(username: string): Observable<boolean> {
        console.log("Trigger API call");
        let existedUsers = ["trungvo", "tieppt", "chautran"];
        let isValid = existedUsers.every(x => x !== username);
        return of(isValid).pipe(delay(1000));
      }
}
