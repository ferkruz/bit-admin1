import { INavRoute, INavRouteItem } from "../interfaces/navRoute.interface";

export class NavRoute implements INavRoute {
  public rootNode: NavRouteItem = null;
  public sectionNode: NavRouteItem = null;
  public subSectionNode: NavRouteItem = null;

  constructor(rootNode: INavRouteItem, sectionNode: INavRouteItem, subSectionNode: INavRouteItem | null){
    this.rootNode = rootNode;
    this.sectionNode = sectionNode;
    this.subSectionNode = subSectionNode;
  }
}

export class NavRouteItem implements INavRouteItem {
  public label: string = '';
  public url: string = '';

  constructor(label: string, url: string) {
    this.label = label;
    this.url = url;
  }
}
