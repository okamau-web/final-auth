import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  username: String = "";
  email: String="";

  constructor(public auth: AuthService, private _router: Router) {
    this.auth.user().subscribe(
      (data) => this.addName(data),
      (error) => this._router.navigate(["/login"])
    );
  }

  addName(data) {
    this.username = data.username;
    this.username = data.email; 
  }
  ngOnInit() {}

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
