import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {LayoutService} from '../../services/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input('config') config: any;

  @ViewChild('sideNavContent') sideNavContent;

  routeConfig: {
    userRoutes: Object[]
  } = {
    userRoutes: [
      {
        icon: 'template',
        route: '/app/template',
        title: 'Templates',
      },
      {
        icon: 'flow',
        route: '/app/flow',
        title: 'Flows'
      },
    ]
  };

  routes: Object[] = [];

  constructor(private layoutService: LayoutService) {
    const sideNavRouteConfig = {
      setRoute: (routeKey: string) => {
        const _vm = this;
        if (routeKey === 'user' || routeKey === 'admin') {
          this.routes = this.routeConfig[routeKey + 'Routes'];
        }
      }
    };
    this.layoutService.initSideNavRoute(sideNavRouteConfig);
  }

  ngOnInit(): void {
    // console.log("app-sidenav", this);
  }

}
