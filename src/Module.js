import {mountAt, State} from "fd-angular-core";


/*

  @Module({
    labels: {
      menu: "Blog",
      create: "New post",
      update: "Edit post"
    },
    index:  ListView,
    update: FormView,
    create: FormView
  })
  class PostsController {

    fetchAll() {

    }

    fetch() {

    }

    create(data) {

    }

    update(data) {

    }

    destroy(data) {

    }

  }

*/

export function Module(opts={}) {
  return function register(constructor) {
    let {labels, index, show, create, update} = opts;

    if (show === undefined) {
      show = update;
      update = undefined;
    }

    let children = (opts.children || []);

    if (index) { children.push(index::mountAt("", { name: 'index' })); }
    if (create) { children.push(create::mountAt("/new", { name: 'create' })); }
    if (update) { children.push(update::mountAt("/:id/edit", { name: 'update' })); }
    if (show) { children.push(show::mountAt("/:id", { name: 'show' })); }

    opts.bindTo = "module";
    opts.abstract = true;
    opts.children = children;

    State(opts)(constructor);

    let state = constructor.$$state.state;
    state.url = `/${state.name}`;

    state.resolve.module = [
      state.name,
      function(mod) {
        mod.labels = labels;
        mod.hasCreate = !!create;
        mod.hasIndex = !!index;
        mod.hasShow = !!show;
        mod.hasUpdate = !!update;
        mod.hasDestroy = !!mod.destroy;
        return mod;
      }];

    constructor.menuItem = {
      name: state.name,
      label: labels.menu,
      url: `/${state.name}`,
    };
  };
}
