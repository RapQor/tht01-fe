import { useState, useEffect } from "react";
import { Cart, getCartResponse } from "./types";
import * as CartApi from "./api";

export const useGetCarts = (productId?: number) => {
  const [carts, setCarts] = useState<getCartResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setLoading(true);
        const data = await CartApi.getCarts(productId);
        setCarts(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCarts();
  }, [productId]);

  return { carts, loading, error };
};

export const useCreateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCart = async (
    productId: number,
    quantity: number
  ): Promise<Cart | null> => {
    try {
      setLoading(true);
      const data = await CartApi.createCart(productId, quantity);
      return data;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCart, loading, error };
};

export const useUpdateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCart = async (
    id: number,
    productId: number,
    quantity: number
  ): Promise<Cart | null> => {
    try {
      setLoading(true);
      const data = await CartApi.updateCart(id, productId, quantity);
      return data;
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateCart, loading, error };
};

export const useDeleteCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCart = async (id: number): Promise<void> => {
    try {
      setLoading(true);
      await CartApi.deleteCart(id);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteCart, loading, error };
};
