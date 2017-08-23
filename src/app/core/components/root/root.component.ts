import {Component, ViewEncapsulation, ViewContainerRef, OnInit} from '@angular/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router'
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RootComponent implements OnInit {
  routerLoader: boolean = false;
  httpLoader: boolean = false;
  constructor(containerRef: ViewContainerRef,
              private router: Router,
              private loader: LoaderService,
              private _iconRegistry: MdIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });

  }

  ngOnInit() {
    // ng OnInit
  }
  // Shows and hides the loading spinner during RouterEvent changes
  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader.show("routerLoader");
    }
    if (event instanceof NavigationEnd) {
      this.loader.hide("routerLoader");
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loader.hide("routerLoader");
    }
    if (event instanceof NavigationError) {
      this.loader.hide("routerLoader");
    }
  }

}
