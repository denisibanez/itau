import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() activeClass: string = '';
  @Input() displayedColumns: any = [];
  @Input() columns: any = [];
  @Input() items: any = [];
  @Output() ActionBtnClick = new EventEmitter<any>();
  @Output() checkboxLabelValue = new EventEmitter<any>();
  @Output() checkboxAlllValue = new EventEmitter<any>();
  @Output() itemsSelected = new EventEmitter<any>();

  dataSource: any = [];
  selection = new SelectionModel<any>(true, []);

  selectItems: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    console.log(this.items);
    this.dataSource = new MatTableDataSource<any>(this.items);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Actions
  actionClick(item: any, men: any) {
    this.ActionBtnClick.emit({
      key: item,
      value: item,
      men: men ? men : '',
    });
  }

  // checkbox
  changeCheckbox(row: any, $event: any) {
    if ($event.checked) {
      this.selectItems.push(row);
    } else {
      this.selectItems = this.selectItems.filter(function (el: any) {
        return el.codigo != row.codigo;
      });
    }
    this.itemsSelected.emit(this.selectItems);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      this.checkboxLabelValue.emit(
        `${this.isAllSelected() ? 'deselect' : 'select'} all`
      );
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    this.checkboxLabelValue.emit(
      `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
        row.codigo + 1
      }`
    );
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectItems = [];

      this.itemsSelected.emit(this.selectItems);
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.selectItems = this.dataSource.data;
    this.itemsSelected.emit(this.selectItems);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.checkboxAlllValue.emit(numSelected === numRows);
    return numSelected === numRows;
  }
}
