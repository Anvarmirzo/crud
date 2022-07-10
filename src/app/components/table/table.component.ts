import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {IProduct} from '../../models/product';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() list: IProduct[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['id', 'productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<IProduct>;


  constructor(private dialog: MatDialog, private apiService: ApiService) {
    this.updateTable(this.list);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTable(this.list);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  onEdit(row: IProduct) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    })
      .afterClosed()
      .subscribe({
        next: (updatedItem: IProduct) => {
          if (updatedItem) this.updateTable(this.list.map(item => item.id === updatedItem.id ? updatedItem : item));
        }
      })
  }

  onDelete(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.updateTable(this.list.filter(item => item.id !== id));
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateTable(list: IProduct[]) {
    this.list = list;
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
