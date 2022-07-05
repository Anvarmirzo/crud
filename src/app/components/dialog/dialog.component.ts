import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Like New', 'Used', 'Very Used'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {

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

  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Form is valid');
    }
  }
}
