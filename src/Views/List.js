import {Inject, State} from "fd-angular-core";
import TMPL from "./List.html!";
import CSS from "./List.css!";

let nextCtrlId = 0;

export function List(opts={}) {
	nextCtrlId++;

	@State({
		templateUrl: TMPL,
		controllerName: `fd.admin.list.${nextCtrlId}`,
	})
	@Inject("$state")
	class ListController {

		constructor($state) {
			this.$state = $state;
		}

		@Inject("module")
		activate(module) {
			return module.fetchAll()
				.then(items => this.items = items);
		}

		@Inject("$element")
		attach($element) {
			$element.addClass(CSS.fdList);
		}

		@Inject("$element")
		detach($element) {
			$element.removeClass(CSS.fdList);
		}

		show(item) {
			this.$state.go("^.show", { id: item.id });
		}

		toggleSelect(item, $event) {
			$event.stopImmediatePropagation();
		}

		firstLetter(item) {
			return item.name.slice(0, 1).toUpperCase();
		}

		letterIconClass(item) {
			return "c" + this.firstLetter(item);
		}

	}

	return ListController;
}
