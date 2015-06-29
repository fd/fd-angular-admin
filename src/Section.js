import {State} from "fd-angular-core";

export function Section(conf, ...children) {
  if (!conf.name) {
    throw Error("name: is required");
  }

  let {name, label} = conf;
  let url = `/${name}`;

  if (name === "root") {
    url = false;
  }

  @State({
    abstract: true,
    name: name,
    url: url,
    children: children,
    controllerName: `section.${name}`
  })
  class SectionController {}

  SectionController.menuItem = {
    name: name,
    label: label,
    url: url,
    children: children.map(c => c.menuItem).filter(c => !!c)
  };

  return SectionController;
}
