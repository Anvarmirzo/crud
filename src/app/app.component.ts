import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './components/dialog/dialog.component';
import {ApiService} from './service/api.service';
import {IProduct} from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private dialog: MatDialog, private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }

  getAllProducts() {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
