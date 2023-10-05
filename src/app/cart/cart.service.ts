import { Injectable } from '@angular/core';
import { CartItem } from '../products/products.service';
import { Product } from '../products/products.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItems: CartItem[] = [];

    constructor() {
        this.loadCartFromLocalStorage();
    }

    getCartItems(): CartItem[] {
        // copy of the cart, so the original cart in the service remains unchanged
        return [...this.cartItems];
    }

    addToCart(product: Product) {
        const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.name === product.name);

        if (existingItemIndex === -1) {
            const cartItem: CartItem = { ...product, quantity: 1 };
            this.cartItems.push(cartItem);
        }
        else {
            // If the product in the cart, increase quantity.
            this.cartItems[existingItemIndex].quantity += 1;
        }
        this.saveCartToLocalStorage();
    }


    removeFromCart(item: any) {
        const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex !== -1) {
            if (this.cartItems[existingItemIndex].quantity > 1) {
                this.cartItems[existingItemIndex].quantity -= 1;
            }
            else {
                this.cartItems.splice(existingItemIndex, 1);
            }
        }
        this.saveCartToLocalStorage();
    }


    private loadCartFromLocalStorage() {
        try {
            const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.cartItems = savedCart;
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
        }
    }

    private saveCartToLocalStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }


    getTotal(): string {
        let totalAmount = 0;
        this.cartItems.forEach(item => {
            const price = item.price;
            totalAmount += price * item.quantity;
        });
        return `$${totalAmount.toFixed(2)}`;
    }

    clearCart() {
        this.cartItems = [];
        this.saveCartToLocalStorage();
    }
}
