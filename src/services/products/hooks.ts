import { useState, useEffect, useCallback } from "react";
import { Product, CreateProductDTO, UpdateProductDTO } from "./types";
import { productApi } from "./api";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (category?: string) => Promise<void>;
  getProduct: (id: number) => Promise<Product | null>;
  createProduct: (product: CreateProductDTO) => Promise<Product | null>;
  updateProduct: (id: number, product: UpdateProductDTO) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<boolean>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (category?: string) => {
    setLoading(true);
    setError(null);

    const response = await productApi.getAllProducts(category);

    if (response.error) {
      setError(response.error);
    } else {
      setProducts(response.data);
    }

    setLoading(false);
  }, []);

  const getProduct = async (id: number): Promise<Product | null> => {
    const response = await productApi.getProductById(id);
    if (response.error) {
      setError(response.error);
      return null;
    }
    return response.data;
  };

  const createProduct = async (
    product: CreateProductDTO
  ): Promise<Product | null> => {
    const response = await productApi.createProduct(product);
    if (response.error) {
      setError(response.error);
      return null;
    }
    await fetchProducts();
    return response.data;
  };

  const updateProduct = async (
    id: number,
    product: UpdateProductDTO
  ): Promise<boolean> => {
    const response = await productApi.updateProduct(id, product);
    if (response.error) {
      setError(response.error);
      return false;
    }
    await fetchProducts();
    return true;
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    const response = await productApi.deleteProduct(id);
    if (response.error) {
      setError(response.error);
      return false;
    }
    await fetchProducts();
    return true;
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
