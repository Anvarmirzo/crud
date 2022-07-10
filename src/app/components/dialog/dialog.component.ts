import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../service/api.service';
import {IProduct} from '../../models/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Like New', 'Used', 'Very Used'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: IProduct,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      comment: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required]
    });

    if (this.editData) {
      const {id, ...data} = this.editData;
      this.productForm.setValue(data)
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.editData ? this.updateProduct() : this.postProduct()
    }
  }

  updateProduct() {
    this.apiService.updateProduct({id: this.editData.id, ...this.productForm.value}).subscribe({
      next: (product) => {
        this.dialogRef.close(product);
        this.productForm.reset();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  postProduct() {
    this.apiService.postProduct(this.productForm.value).subscribe({
      next: (product) => {
        this.dialogRef.close(product);
        this.productForm.reset();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
