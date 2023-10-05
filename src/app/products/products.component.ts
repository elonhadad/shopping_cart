import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product, ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  products: Product[];
  feedbackMessage: string | null = null;
  feedbackMessageType: 'add' | null = null;
  fadeTimeout: any;

  currentProduct: Product | null = null;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private cdRef: ChangeDetectorRef
  ) {
    this.products = this.productsService.getProducts();
  }

  showFeedbackMessage(message: string, type: 'add') {
    clearTimeout(this.fadeTimeout);

    this.feedbackMessage = message;
    this.feedbackMessageType = type;

    this.cdRef.detectChanges();

    this.fadeTimeout = setTimeout(() => {
      this.feedbackMessageType = null;
      this.cdRef.markForCheck();
    }, 2500);
  }



  addToCart(product: Product) {
    this.currentProduct = product;  // Keep track of the current product
    this.cartService.addToCart(product);
    this.showFeedbackMessage("Added to cart!", 'add');
  }
}
