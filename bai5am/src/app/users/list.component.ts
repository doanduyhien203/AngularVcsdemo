import { Component, OnInit } from "@angular/core";
import { first } from "rxjs";
import { UserLoginService } from "../_service/userlogin.service";

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private loginService: UserLoginService) {}

    ngOnInit() {
        this.loginService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.loginService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
    }
}