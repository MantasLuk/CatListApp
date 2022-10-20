import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertifyjs from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css'],
})
export class CatComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;

  public catData: any = [];
  public allCatData: any = [];

  ngOnInit(): void {
    this.loadCatList();
  }

  displayColumns: string[] = ['name', 'age', 'description', 'action'];

  openPopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '400px',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
      data: {
        id: id,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      this.loadCatList();
    });
  }

  loadCatList() {
    this.api.getList().subscribe((response) => {
      this.catData = response.data;
      this.allCatData = new MatTableDataSource<any>(this.catData);
      this.allCatData.paginator = this._paginator;
    });
  }

  editCat(id: string) {
    this.openPopup(id);
  }

  deleteCat(id: any) {
    alertifyjs.confirm(
      'Remove Cat',
      "What's happened!? <br/> Do you really want to remove this Cat?",
      () => {
        this.api.deleteCat(id).subscribe((resp) => {
          this.loadCatList();
        });
      },
      function () {}
    );
  }
}
