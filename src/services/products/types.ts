export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export type CreateProductDTO = Omit<Product, "id">;
export type UpdateProductDTO = Partial<CreateProductDTO>;

export interface ProductResponse {
  data: Product[];
  error?: string;
}

export interface SingleProductResponse {
  data: Product;
  error?: string;
}
