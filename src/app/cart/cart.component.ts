import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from '../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  fadeTimeout: any;  // holds the reference for the setTimeout
  feedbackMessage: string | null = null;
  feedbackMessageType: 'add' | 'remove' | 'clear' | 'fade-out' | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.refreshCartItems();
  }

  showFeedbackMessage(message: string, type: 'add' | 'remove' | 'clear') {
    clearTimeout(this.fadeTimeout);
    this.feedbackMessage = message;
    this.feedbackMessageType = type;

    this.fadeTimeout = setTimeout(() => {
      this.feedbackMessageType = null;
    }, 2500);

    setTimeout(() => {
      if (this.feedbackMessageType === null) {
        this.feedbackMessage = null;
      }
    }, 2800);
  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(item);
    this.feedbackMessage = `${item.name} added to cart.`;
    this.showFeedbackMessage(`${item.name} added to cart.`, 'add');
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.feedbackMessage = `${item.name} removed from cart.`;
    this.refreshCartItems();  // Make sure this line is there
    this.showFeedbackMessage(`${item.name} removed from cart.`, 'remove');
  }


  getTotal(): string {
    return this.cartService.getTotal();
  }

  clearAllItems() {
    this.cartService.clearCart();
    this.refreshCartItems();
    this.feedbackMessage = "All items cleared from cart.";
    this.showFeedbackMessage("All items cleared from cart.", 'clear');
  }

  private refreshCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }
}