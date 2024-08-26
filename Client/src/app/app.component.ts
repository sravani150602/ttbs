import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, location: Location) {
    location.subscribe(ev => {
      console.log(ev)
      if (ev.url == "") {
        this.checkIsLoggedIn()
      }
    })
  }

  ngOnInit(): void {
    this.checkIsLoggedIn()
  }

  checkIsLoggedIn() {
    if (JSON.parse(localStorage.getItem("user") as string)) {
      this.router.navigate(['home']).then((r) => {
        console.log('user already logged in redirecting to home')
      })
    }
  }

}
