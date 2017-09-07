import {Component, OnInit, Inject} from '@angular/core';
import {Task} from '../../interfaces/template';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-filter-template',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {
  task: Task;
  title: string = '';
  dialog: MdDialog;

  constructor(public dialogRef: MdDialogRef<AddFilterComponent>, @Inject(MD_DIALOG_DATA) public data: Task) {
    this.task = data || <Task>{filters: []};
    if (!this.task.filters) {
      this.task.filters = [];
    }
    this.title = data ? 'Edit Filter' : 'Add Filter';
  }

  ngOnInit() {

  }

  addNewFilter() {
    this.task.filters.push({id: this.task.filters.length + 1, name: '', description: ''});
  }

  removeFilter(filter) {
    this.task.filters = this.task.filters.filter(t => t.id !== filter.id);
  }

  closeModal() {
    this.dialogRef.close();
  }

  addUpdateTemplate() {
    this.dialogRef.close(this.task);
  }
}
