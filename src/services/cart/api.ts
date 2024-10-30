import axios from "axios";
import { Cart, getCartResponse } from "./types";

const API_URL = "http://localhost:5000/carts";

export const createCart = async (
  productId: number,
  quantity: number
): Promise<Cart> => {
  const response = await axios.post<Cart>(API_URL, { productId, quantity });
  return response.data;
};

export const getCarts = async (
  productId?: number
): Promise<getCartResponse[]> => {
  const url = productId ? `${API_URL}?product_id=${productId}` : API_URL;
  const response = await axios.get<getCartResponse[]>(url);
  return response.data;
};

export const getCartById = async (id: number): Promise<Cart> => {
  const response = await axios.get<Cart>(`${API_URL}/${id}`);
  return response.data;
};

export const updateCart = async (
  id: number,
  productId: number,
  quantity: number
): Promise<Cart> => {
  const response = await axios.put<Cart>(`${API_URL}/${id}`, {
    productId,
    quantity,
  });
  return response.data;
};

export const deleteCart = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
