import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  public editCatData: any = [];

  constructor(
    private builder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getCat(this.data.id).subscribe((resp) => {
        this.editCatData = resp.data[0].info;
        this.catForm.setValue({
          name: this.editCatData.name,
          age: this.editCatData.age,
          description: this.editCatData.description,
        });
      });
    }
  }

  catForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
  });

  saveCat() {
    if (this.catForm.valid) {
      const editID = this.data.id;
      if (this.data.id != '' && this.data.id != null) {
        this.api.updateCat(editID, this.catForm.value).subscribe((resp) => {
          this.closePopup();
          alertifyjs.success('The Cat is Updated!');
        });
      } else {
        this.api.createCat(this.catForm.value).subscribe((response) => {
          this.closePopup();
          alertifyjs.success('New Cat created successfully!');
        });
      }
    }
  }

  closePopup() {
    this.dialog.closeAll();
  }
}
