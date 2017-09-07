import {Component, OnInit, Inject} from '@angular/core';
import {Template} from '../../interfaces/template';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdDialogConfig} from '@angular/material';
import {AddFilterComponent} from '../add-filter/add-filter.component';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {
  template: Template;
  title: string = '';

  constructor(public dialog: MdDialog, public dialogRef: MdDialogRef<AddTemplateComponent>, @Inject(MD_DIALOG_DATA) public data: Template) {
    this.template = data || <Template>{tasks: []};
    if (!this.template.tasks) {
      this.template.tasks = [];
    }
    this.title = data ? 'Edit Template' : 'Add Template';
  }

  ngOnInit() {

  }

  addNewTask() {
    this.template.tasks.push({id: this.template.tasks.length + 1, name: '', description: ''});
  }

  removeTask(task) {
    this.template.tasks = this.template.tasks.filter(t => t.id !== task.id);
  }

  addFilter(task) {
    let dialogRef = this.dialog.open(AddFilterComponent, <MdDialogConfig>{
      height: '600px',
      width: '600px',
      hasBackdrop: true,
      disableClose: false,
      data: task
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task = result;
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  addUpdateTemplate() {
    this.dialogRef.close(this.template);
  }
}
