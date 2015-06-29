import {Inject, State} from "fd-angular-core";
import TMPL from "./Form.html!";

export function Form(opts) {

  @State({ templateUrl: TMPL })
  @Inject("module")
  class FormController {

    constructor(module) {
      this.module = module;
      this.formTMPL = (opts.templateUrl);
    }

    @Inject("$stateParams")
    activate($stateParams) {
      if (!$stateParams.id) {
        this.item = {};
        this.isCreate = true;
        return undefined;
      }

      this.isUpdate = true;
      return this.module.fetch($stateParams.id)
        .then(item => this.item = item);
    }

    @Inject("$state")
    attach($state) {
      this.$state = $state;
    }

    submit() {
      let p;

      if (this.isCreate) {
        p = this.module.create(this.item);
      } else {
        p = this.module.update(this.item);
      }

      p = p
        .then(item => this.item = item)
        .then(item => this.$state.go("^.show", {id: item.id}));
    }

  }

  return FormController;
}
