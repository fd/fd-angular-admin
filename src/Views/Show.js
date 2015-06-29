import {Inject, State} from "fd-angular-core";

export function Show(opts) {

  @State({ templateUrl: opts.templateUrl })
  class ShowController {

    @Inject("module", "$stateParams")
    activate(module, $stateParams) {
      return module.fetch($stateParams.id)
        .then(item => this.item = item);
    }

  }

  return ShowController;
}
