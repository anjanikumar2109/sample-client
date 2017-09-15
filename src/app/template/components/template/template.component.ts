import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LayoutService} from '../../../layout/services/layout.service';
import {TemplateApiService} from '../../services/template-api.service';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject, Observable} from 'rxjs';
import {MdSort, MdPaginator, MdTable, MdDialogConfig, MdDialog, MdSnackBar} from '@angular/material';
import {AddTemplateComponent} from '../add-template/add-template.component';
import {Template} from '../../interfaces/template';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'createdOn', 'modifiedOn', 'actions'];
  filterableColumns = ['name', 'description'];
  exampleDatabase: any;
  dataSource: TableDataSource | null;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: MdTable<any>;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(public dialog: MdDialog, private layoutService: LayoutService,
              private templateApiService: TemplateApiService, private snackBar: MdSnackBar) {
    this.layoutService.setSideNavRoute('user');
  }

  ngOnInit() {
    this.exampleDatabase = new TableDatabase(this.templateApiService);
    this.dataSource = new TableDataSource(this.exampleDatabase, this.filterableColumns, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  ngOnDestroy(): void {
    this.exampleDatabase.unSubscribeToData();
  }

  addNew() {
    let dialogRef = this.dialog.open(AddTemplateComponent, <MdDialogConfig>{
      height: '600px',
      width: '600px',
      hasBackdrop: true,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.templateApiService.addTemplate(result).subscribe((data) => {
          this.snackBar.open("Added new template", "Close", {
            duration: 3000
          });
          this.exampleDatabase.getData();
        });
      }
    });
  }

  editTemplate(template: Template) {
    let dialogRef = this.dialog.open(AddTemplateComponent, <MdDialogConfig>{
      height: '600px',
      width: '600px',
      hasBackdrop: true,
      disableClose: true,
      data: template
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.templateApiService.editTemplate(result).subscribe((data) => {
          this.snackBar.open("Updated template", "Close", {
            duration: 3000
          });
          this.exampleDatabase.getData();
        });
      }
    });
  }

  deleteTemplate(template: Template) {
    this.templateApiService.deleteTemplate(template).subscribe((data) => {
      this.snackBar.open("Deleted template", "Undo", {
        duration: 3000
      });
      this.exampleDatabase.getData();
    });
  }

  createFlow(template: Template) {
    this.templateApiService.deleteTemplate(template).subscribe((data) => {
      this.snackBar.open("Created new flow", "Close", {
        duration: 3000
      });
    });
  }

}

export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  templateApiService: any;
  templatesSubscription: any;
  timerSubscription: any;

  get data(): any[] {
    return this.dataChange.value;
  }

  constructor(templateApiService) {
    this.templateApiService = templateApiService;
    this.getData();
  }

  getData() {
    this.templatesSubscription = this.templateApiService.getTemplates().subscribe(data => {
      const records = data.sort((a, b) => {
        return a.id - b.id;
      });
      this.dataChange.next(records);
      this.subscribeToData();
    })
  }

  subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.getData());
  }

  unSubscribeToData(): void {
    if (this.templatesSubscription) {
      this.templatesSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}

export class TableDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _tableDatabase: TableDatabase, private filterableColumns: any[],
              private _sort?: MdSort, private _paginator?: MdPaginator) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges: any[] = [
      this._tableDatabase.dataChange,
      this._filterChange
    ];
    if (this._sort) {
      displayDataChanges.push(this._sort.mdSortChange)
    }
    if (this._paginator) {
      displayDataChanges.push(this._paginator.page)
    }
    return Observable.merge(...displayDataChanges).map(() => {
      let data = this._tableDatabase.data.slice();
      // Logic For pagination
      if (this._paginator) {
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        data = data.splice(startIndex, this._paginator.pageSize);
      }

      // Logic for Sorting
      if (this._sort && (this._sort.active || this._sort.direction !== '')) {
        data = data.sort((a, b) => {
          let propertyA: any = '';
          let propertyB: any = '';
          if (this._sort.active) {
            const property = this._sort.active;
            [propertyA, propertyB] = [a[property], b[property]];
          }
          const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
      }
      // Logic For filtering Data.
      return data.filter((item: any) => {
        let searchStr = '';
        this.filterableColumns.forEach((i: string) => {
          searchStr += item[i] ? item[i].toLowerCase() : item[i];
        });
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {
  }
}

