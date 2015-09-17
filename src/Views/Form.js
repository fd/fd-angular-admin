import {Inject, State} from "fd-angular-core";
import TMPL from "./Form.html!";
import CSS from "./Form.css!";

let nextCtrlId = 0;

export function Form(opts) {
	nextCtrlId++;

	@State({
		templateUrl: TMPL,
		controllerName: `fd.admin.form.${nextCtrlId}`,
	})
	@Inject("module", '$mdDialog')
	class FormController {

		constructor(module, $mdDialog) {
			this.$mdDialog = $mdDialog;
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

		@Inject('$state', "$element")
		attach($state, $element) {
			this.$state = $state;
			$element.addClass(CSS.fdForm);
		}

		@Inject("$element")
		detach($element) {
			$element.removeClass(CSS.fdForm);
		}

		cancel($event) {
			$event.stopImmediatePropagation();
			$event.preventDefault();
			if (this.isCreate) {
				this.$state.go("^.index");
			} else {
				this.$state.go("^.show", {id: this.item.id});
			}
		}

		submit() {
			let p;

			if (this.isCreate) {
				p = this.module.create(this.item);
				if (!p) { throw Error(".create(item) must return a Promise"); }
			} else {
				p = this.module.update(this.item);
				if (!p) { throw Error(".update(item) must return a Promise"); }
			}

			p = p
				.then(item => this.item = item)
				.then(item => this.$state.go("^.show", {id: item.id}));

			p = p.catch(error => {
				let message = (error && error.message) || error;

				if (error.status === 403) {
					message = "You are not allowed to do this.";
				}

				let alert = this.$mdDialog.alert()
					.title('Oops, something went wrong.')
					.content(`${message}`)
					.ok('Close');
				return this.$mdDialog.show(alert);
			});

			return p;
		}

	}

	return FormController;
}
