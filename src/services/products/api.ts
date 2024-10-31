import axios, { AxiosError } from "axios";
import { api } from "../../lib/api";
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ProductResponse,
  SingleProductResponse,
} from "./types";

const PRODUCTS_URL = `${api}/products`;

export const productApi = {
  // Get all products
  getAllProducts: async (category?: string): Promise<ProductResponse> => {
    try {
      const url = category
        ? `${PRODUCTS_URL}?category=${category}`
        : PRODUCTS_URL;
      const response = await axios.get(url);
      return { data: response.data };
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      return {
        data: [],
        error: err.response?.data?.error || "Failed to fetch products",
      };
    }
  },

  // Get product by ID
  getProductById: async (id: number): Promise<SingleProductResponse> => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}/${id}`);
      return { data: response.data };
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      return {
        data: {} as Product,
        error: err.response?.data?.error || "Failed to fetch product",
      };
    }
  },

  // Create product
  createProduct: async (
    product: CreateProductDTO
  ): Promise<SingleProductResponse> => {
    try {
      const response = await axios.post(PRODUCTS_URL, product);
      return { data: response.data };
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      return {
        data: {} as Product,
        error: err.response?.data?.error || "Failed to create product",
      };
    }
  },

  // Update product
  updateProduct: async (
    id: number,
    product: UpdateProductDTO
  ): Promise<{ error?: string }> => {
    try {
      await axios.put(`${PRODUCTS_URL}/${id}`, product);
      return {};
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      return {
        error: err.response?.data?.error || "Failed to update product",
      };
    }
  },

  // Delete product
  deleteProduct: async (id: number): Promise<{ error?: string }> => {
    try {
      await axios.delete(`${PRODUCTS_URL}/${id}`);
      return {};
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      return {
        error: err.response?.data?.error || "Failed to delete product",
      };
    }
  },
};
