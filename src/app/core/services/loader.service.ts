import {Injectable, Component} from '@angular/core';
import {LoaderComponent} from '../components/loader/loader.component';

@Injectable()
export class LoaderService {

  components: any = {};

  constructor() {
    // To Do
  }

  show(loaderName: string): void {
    if (loaderName && this.components[loaderName]) {
      if (typeof(this.components[loaderName].show) === 'function') {
        this.components[loaderName].show();
      }
    }
  }

  hide(loaderName: string): void {
    if (loaderName && this.components[loaderName]) {
      if (typeof(this.components[loaderName].hide) === 'function') {
        this.components[loaderName].hide();
      }
    }
  }

  set(component: Spinner): void {
    if(component){
      this.components[component.name] = component;
    }
  }

  remove(loaderName: string): void {
    if(loaderName && this.components[loaderName]){
      delete this.components[loaderName];
    }
  }

}

export interface Spinner {
  name: string,
  show(): void;
  hide(): void;
}
