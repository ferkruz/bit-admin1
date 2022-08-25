export interface INavRoute {
  rootNode: INavRouteItem;
  sectionNode: INavRouteItem;
  subSectionNode: INavRouteItem;
}

export interface INavRouteItem {
  label: string;
  url: string;
}
