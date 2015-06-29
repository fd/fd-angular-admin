import {Inject, State} from "fd-angular-core";
import TMPL from "./List.html!";
import CSS from "./List.css!pcss";
import defaultItemTMPL from "./ListItem.html!";

let nextCtrlName = 0;

export function List(opts={}) {
  nextCtrlName++;

  @State({
    templateUrl: TMPL,
    controllerName: `list.${nextCtrlName}`
  })
  @Inject("$state")
  class ListController {

    constructor($state) {
      this.$state = $state;
      this.itemTMPL = (opts.templateUrl || defaultItemTMPL);
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

  }

  return ListController;
}
