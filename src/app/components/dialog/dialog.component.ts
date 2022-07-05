import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Like New', 'Used', 'Very Used'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
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
      this.apiService.postProduct(this.productForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }
      })
    }
  }
}
