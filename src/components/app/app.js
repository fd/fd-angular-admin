/* */
import {Inject, State} from "fd-angular-core";
import './app.css!css';
import TMPL from './app.html!html';

var modules = [];

@State({
	abstract: true,
	templateUrl: TMPL,
	children: modules,
})
@Inject("$mdSidenav", "$mdMedia", "$location")
export class AppController {

	static setRootSection(section) {
		AppController.rootSection = section;
		modules.push(section);
	}

	constructor($mdSidenav, $mdMedia, $location) {
		this.screenIsSmall = $mdMedia("sm");
		this.$location = $location;
		this.root = AppController.rootSection.menuItem;
		this.$mdSidenav = $mdSidenav;
	}

	toggleNav() {
		this.$mdSidenav("sidenav").toggle();
	}

	@Inject('$element')
	attach($element) {
		$element.addClass("layout md-layout-row flex layout-fill");
	}

	goHome() {
		this.$location.path("/");
		if (!this.$mdSidenav("sidenav").isLockedOpen()) {
			this.$mdSidenav("sidenav").close();
		}
	}

	go(item) {
		this.$location.path(item.url);
		if (!this.$mdSidenav("sidenav").isLockedOpen()) {
			this.$mdSidenav("sidenav").close();
		}
	}

}
