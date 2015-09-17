/* */
import {mountAt, State, Metadata} from "fd-angular-core";


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
		opts.aliases = ['module'];

		State(opts)(constructor);

		let meta = Metadata(constructor);

		var moduleConstructor = function moduleConstructor(...rest) {
			this.labels = labels;
			this.hasCreate = !!create;
			this.hasIndex = !!index;
			this.hasShow = !!show;
			this.hasUpdate = !!update;
			this.hasDestroy = !!this.destroy;
			constructor.apply(this, rest);
		};
		moduleConstructor = meta.wrap(moduleConstructor);
		moduleConstructor.$inject = [].concat(constructor.$inject || []);

		meta.state.url = `/${meta.state.name}`;

		constructor.menuItem = {
			name: meta.state.name,
			label: labels.menu,
			url: `/${meta.state.name}`,
		};
	};
}
