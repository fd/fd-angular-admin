import {app, includeModule, bootstrap as ngBootstrap} from "fd-angular-core";
import {AppController} from "./components/app/app";

import ActionIconSet from "../icons/svg-sprite-action.svg!html";
import ContentIconSet from "../icons/svg-sprite-content.svg!html";
import NavigationIconSet from "../icons/svg-sprite-navigation.svg!html";

import "angular-messages";
import "angular-material";
includeModule("ngMessages");
includeModule("ngMaterial");

export {app};

export function bootstrap(rootSection, opts) {
	AppController.setRootSection(rootSection);
	let mods = (opts && opts.modules) || [];
	return ngBootstrap(AppController, ...mods);
}

export {Module} from "./Module";
export {Section} from "./Section";
export {List} from "./Views/List";
export {Show} from "./Views/Show";
export {Form} from "./Views/Form";

app.config(function($locationProvider){
	$locationProvider.html5Mode(true).hashPrefix("!");
});

app.config(function($mdIconProvider) {
	$mdIconProvider
		.iconSet("action", ActionIconSet, 24)
		.iconSet("content", ContentIconSet, 24)
		.iconSet("navigation", NavigationIconSet, 24);
});
