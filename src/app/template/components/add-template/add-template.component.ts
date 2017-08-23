import {Component, OnInit, Inject} from '@angular/core';
import {Template} from '../../interfaces/template';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {
  template: Template;
  title: string = '';

  constructor(public dialogRef: MdDialogRef<AddTemplateComponent>, @Inject(MD_DIALOG_DATA) public data: Template) {
    this.template = data || <Template>{tasks: []};
    if(!this.template.tasks) {
      this.template.tasks = [];
    }
    this.title = data ? 'Edit Template': 'Add Template';
  }

  ngOnInit() {

  }

  addNewTask() {
    this.template.tasks.push({id: this.template.tasks.length + 1, name: '', description: ''});
  }

  removeTask(task) {
    this.template.tasks = this.template.tasks.filter(t => t.id !== task.id);
  }

  closeModal() {
    this.dialogRef.close();
  }

  addUpdateTemplate() {
    this.dialogRef.close(this.template);
  }
}
