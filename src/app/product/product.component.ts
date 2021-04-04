import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input('item') item: any;
  closeResult = '';
  success = false;
  product = {};
  id;

  constructor(
    private productService: ProductsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.product = {
      title: this.item.title,
      description: this.item.description,
      price: this.item.price,
      image: this.item.image,
      category: this.item.category,
    };
  }

  open(content, id) {
    this.id = id;
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

  updateItem(id) {
    this.productService
      .updateProduct(id, JSON.stringify(this.product))
      .subscribe(
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

  deleteItem(id) {
    if (confirm('Are yu sure to delete ?')) {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          console.log(data);
          alert('product deleted');
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
}
