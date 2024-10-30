import { Stack, Text } from "@chakra-ui/react";
import {
  useDeleteCart,
  useGetCarts,
  useUpdateCart,
} from "../services/cart/hooks";
import { getCartResponse } from "../services/cart/types";
import { CartCard } from "../components/card/cart-card";

const CartPage = () => {
  const { carts, loading, error } = useGetCarts();
  const { updateCart } = useUpdateCart();
  const { deleteCart } = useDeleteCart();

  const handleUpdateCart = async (
    id: number,
    product_id: number,
    quantity: number
  ) => {
    try {
      await updateCart(id, product_id, quantity);
    } catch (e) {
      console.error("Error updating cart:", e);
    }
  };

  const handleDeleteCart = async (id: number) => {
    try {
      await deleteCart(id);
    } catch (e) {
      console.error("Error deleting cart:", e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack w="full" p={8} gap={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Cart
      </Text>
      {carts.length === 0 ? (
        <Text color="gray.500">Your cart is empty.</Text>
      ) : (
        carts.map((cart: getCartResponse) => (
          <CartCard
            key={cart.id}
            cart={cart}
            onUpdate={handleUpdateCart}
            onDelete={handleDeleteCart}
          />
        ))
      )}
    </Stack>
  );
};

export default CartPage;
