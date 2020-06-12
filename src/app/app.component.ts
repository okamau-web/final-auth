import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "kamaa";
   
  constructor(public auth: AuthService, private _router: Router) {}


  logout() {
    this.auth.logout().subscribe(
      (data) => {
        // console.log(data);
        this._router.navigate(["/login"]);
      },
      (error) => console.error(error)
    );
  }
}
