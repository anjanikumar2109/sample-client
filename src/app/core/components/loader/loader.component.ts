import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LoaderService, Spinner} from '../../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, Spinner {

  @Input("name") name: string = "spinner";
  @Output('load') load: EventEmitter<LoaderComponent>;

  showSpinner: boolean = false;

  constructor(private loaderService: LoaderService) {
    // Constructor
  }

  ngOnInit(): void {
    this.loaderService.set(this);
    if(this.load){
      this.load.emit(this);
    }
  }

  show(): void {
    this.showSpinner = true;
  }

  hide(): void {
    this.showSpinner = false;
  }

}
