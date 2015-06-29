import {Inject, State} from "fd-angular-core";
import "./app.css!";
import TMPL from "./app.html!";

var modules = [];

@State({
  abstract: true,
  templateUrl: TMPL,
  children: modules
})
@Inject("$mdSidenav")
export class AppController {

  static setRootSection(section) {
    AppController.rootSection = section;
    modules.push(section);
  }

  constructor($mdSidenav) {
    this.root = AppController.rootSection.menuItem;
    this.$mdSidenav = $mdSidenav;
  }

  toggleNav() {
    this.$mdSidenav("sidenav").toggle();
  }

}
