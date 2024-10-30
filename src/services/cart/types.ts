export interface Cart {
  id: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  };
}

export interface getCartResponse {
  id: number;
  quantity: number;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_category: string;
  product_stock: number;
}
