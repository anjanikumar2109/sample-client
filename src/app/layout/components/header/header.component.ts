import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input('config') config: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    // To Do
  }

  ngOnInit(): void {
    // To Do
  }

  toggleSideNav(event: any): void {
    this.onChange.emit({type: 'toggleSideNav', event: event, instance: this});
  }

  searchDebounceEvent(event: any): void {
    //
  }

  searchEvent(event: any): void {
    //
  }

  searchClearEvent(event: any): void {
    //
  }

}
