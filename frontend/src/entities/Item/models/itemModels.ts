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
export interface ItemAttributes {
    trend: string;
    price: number;
    name: string;
    brand: string;
    image: {
        data: ImageData | null;
    };
    category: {
        data: CategoryData;
    }
}

export interface ItemProps {
    id: number;
    item: {
        id: number;
        attributes: ItemAttributes;
    };
}
