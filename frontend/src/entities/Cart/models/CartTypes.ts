export interface ImageData {
    attributes: {

        url: string;
    };

}
export interface CategoryData {
    attributes: {
        name: string;
    }
}

// Define types for items and cart state
export interface ItemAttributes {
    category: {
        data: CategoryData;
    }
    brand: string;
    trend: string;
    price: number;
    name: string;
    image: {
        data: ImageData | null;
    };
}

export interface Item {
    id: number;
    attributes: ItemAttributes;
}

export interface CartItem extends Item {
    qnty: number;
}

export interface CartState {
    cart: CartItem[];
    items: Item[];
    item: Item | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}