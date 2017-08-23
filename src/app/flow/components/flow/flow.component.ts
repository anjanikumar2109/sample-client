import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LayoutService} from '../../../layout/services/layout.service';
import {FlowApiService} from '../../services/flow-api.service';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject, Observable} from 'rxjs';
import {MdSort, MdPaginator, MdTable, MdDialogConfig, MdDialog, MdSnackBar} from '@angular/material';
import {Flow} from '../../interfaces/flow';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'createdOn', 'modifiedOn'];
  filterableColumns = ['name', 'description'];
  exampleDatabase: any;
  dataSource: TableDataSource | null;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: MdTable<any>;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(public dialog: MdDialog, private layoutService: LayoutService,
              private flowApiService: FlowApiService, private snackBar: MdSnackBar) {
    this.layoutService.setSideNavRoute('user');
  }

  ngOnInit() {
    this.exampleDatabase = new TableDatabase(this.flowApiService);
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
}

export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  flowApiService: any;
  get data(): any[] {
    return this.dataChange.value;
  }

  constructor(flowApiService) {
    this.flowApiService = flowApiService;
    this.getData();
  }

  getData() {
    this.flowApiService.getFlows().subscribe(data => {
      this.dataChange.next(data);
    })
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

