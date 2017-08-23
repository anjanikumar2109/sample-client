import {Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';

import {TdMediaService} from '@covalent/core';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import {SidenavComponent} from '../sidenav/sidenav.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  sideNavOpened: boolean = false;
  @ViewChild('sideNavContent') sideNav: SidenavComponent;
  @ViewChild('header') header: HeaderComponent;
  @ViewChild('footer') footer: FooterComponent;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private _iconRegistry: MdIconRegistry,
              private _domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // console.log(this);
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  headerChange(event: any): void {
    // console.log(event, this);

    if (event.type === 'toggleSideNav') {
      // this.sideNavOpened = !this.sideNavOpened;
      // console.log(this.sideNav.config);
      this.sideNav.config.open();
    }
    // console.log(event, this.sideNavOpened);
  }

}
