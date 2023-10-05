import { Injectable } from '@angular/core';

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    private products: Product[] = [
        { id: 1, name: "Steak", price: 35, imageUrl: "./assets/img/1.jpg" },
        { id: 2, name: "Hamburger", price: 15, imageUrl: "./assets/img/2.jpg" },
        { id: 3, name: "Meatballs", price: 13, imageUrl: "./assets/img/3.jpg" },
        { id: 4, name: "Pasta", price: 10, imageUrl: "./assets/img/4.jpg" },
        { id: 5, name: "Salads", price: 8, imageUrl: "./assets/img/5.jpg" },
        { id: 6, name: "Breakfast", price: 12, imageUrl: "./assets/img/6.jpg" },
        { id: 7, name: "Pizza", price: 8, imageUrl: "./assets/img/7.jpg" },
        { id: 8, name: "Fruit", price: 15, imageUrl: "./assets/img/8.jpg" },
    ];

    getProducts() {
        return this.products;
    }
}