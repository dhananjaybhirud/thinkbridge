import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products;
  closeResult = '';
  success = false;
  product = {
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
  };

  constructor(
    private productService: ProductsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        // this.error = error;
        // this.loading = false;
      }
    );
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addProduct() {
    console.log(this.product);
    this.productService.addProduct(JSON.stringify(this.product)).subscribe(
      (data) => {
        console.log(data);
        this.success = true;
        // fetch latest data
        this.modalService.dismissAll();
      },
      (error) => {
        // this.error = error;
        // this.loading = false;
      }
    );
  }
}
