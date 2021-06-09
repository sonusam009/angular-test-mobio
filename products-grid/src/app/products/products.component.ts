import { Component, OnInit, HostListener } from '@angular/core';
import { Products } from '../products';
import { ProductsServiceService } from '../products-service.service';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productService: ProductsServiceService;
  products: Array<Products> = new Array<Products>();
  datePipe: DatePipe;
  atBottom = false;
  page: number = 1;
  loading: boolean = false;

  constructor(productService: ProductsServiceService, datePipe: DatePipe) {
    this.productService = productService;
    this.datePipe = datePipe;
  }

  ngOnInit(): void {
    this.bindGrid();
  }

  bindGrid() {
    this.productService.getProducts(this.page).subscribe((data) => {
      this.products.push(...data);
      this.loading = false;
      if (data.length == 0) {
        this.atBottom = true;
      }
    });
  }

  checkDate(itemDate: string) {
    let today: Date = new Date();
    let lastWekkdate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
    let productDate: Date = new Date(itemDate);
    if (productDate > lastWekkdate) {
      return today.getDate() - productDate.getDate() + " days ago";
    } else {
      return this.datePipe.transform(productDate, 'dd/MM/yyyy');
    }
  }

  sortBy(type: string) {
    this.productService.getProductsSort(type).subscribe((data) => {
      this.products = data;
    });
  }

  checkthis(e: any) {
    if (e.target.scrollHeight < e.target.scrollTop + e.target.offsetHeight) {
      if (!this.atBottom) {
        this.loading = true;
        this.page++;
        this.bindGrid();
      }
    } else {
      this.loading = false;
    }
  }

}
