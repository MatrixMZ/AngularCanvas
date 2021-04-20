import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-node-dialog',
  templateUrl: './add-node-dialog.component.html',
  styleUrls: ['./add-node-dialog.component.scss']
})
export class AddNodeDialogComponent implements OnInit {

  selectedNodeType: String = '';
  form = new FormGroup({
    nodeType: new FormControl('decision', [Validators.required]),
    leftBranch: new FormControl('yes', [Validators.required, Validators.minLength(1)]),
    rightBranch: new FormControl('no', [Validators.required, Validators.minLength(1)]),
    nodeTitle: new FormControl('Faraon Mumia12312345', [Validators.required, Validators.minLength(1)])
  });

  constructor(public dialogRef: MatDialogRef<AddNodeDialogComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.form.valid){
      console.log(this.form)
      this.dialogRef.close(this.form)
    }
  }

}
