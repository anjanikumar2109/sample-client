import {Injectable} from '@angular/core';

@Injectable()
export class LayoutService {

  private _sideNavRouteConfig: RouteConfig;

  constructor() {
  }

  initSideNavRoute(routeConfig: RouteConfig) {
    // console.log(routeConfig);
    if (routeConfig) {
      this._sideNavRouteConfig = routeConfig;
    }
  }

  setSideNavRoute(routeKey: string) {
    // console.log(this, routeKey, this._sideNavRouteConfig);
    if (routeKey && this._sideNavRouteConfig) {
      this._sideNavRouteConfig.setRoute(routeKey);
    }
  }

}

interface RouteConfig {
  setRoute: (key: string) => void;
}
