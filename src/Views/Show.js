import {Inject, State} from "fd-angular-core";

let nextCtrlId = 0;

export function Show(opts={}) {
  nextCtrlId++;

  @State({
    templateUrl: opts.templateUrl,
    controllerName: `fd.admin.show.${nextCtrlId}`
  })
  class ShowController {

    @Inject("module", "$stateParams")
    activate(module, $stateParams) {
      return module.fetch($stateParams.id)
        .then(item => this.item = item);
    }

  }

  return ShowController;
}
