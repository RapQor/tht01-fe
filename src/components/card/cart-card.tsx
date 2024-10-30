import React from "react";
import { Stack, Text, Image, Button, Box } from "@chakra-ui/react";
import { getCartResponse } from "../../services/cart/types";

interface CartCardProps {
  cart: getCartResponse;
  onUpdate: (id: number, product_id: number, quantity: number) => void;
  onDelete: (id: number) => void;
}

// console.log(CartCardProps);

export const CartCard: React.FC<CartCardProps> = ({
  cart,
  onUpdate,
  onDelete,
}) => {
  return (
    <Stack
      w="full"
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      direction="row"
      align="center"
      p={4}
    >
      <Image
        src="https://images.squarespace-cdn.com/content/v1/58928af6bf629adabaeae969/1575315322740-XHLPFEZD2VG6DLVUN9HW/ke17ZwdGBToddI8pDm48kDEDYh4Y0JGhR6hzuwcJ44gUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcz6bs2FkMoqlrQIzq4g5ogDqXr_T7rMikH_TfPkEE4wwzGwe9KEhUq6A0DxOZf-75/IMG_1570.jpg"
        alt={cart.product_name}
        h="100px"
        w="100px"
        objectFit="cover"
      />
      <Stack p={4} gap={2} w="full">
        <Text fontSize="xl" fontWeight="bold" color="blue.600" isTruncated>
          {cart.product_name}
        </Text>
        <Text
          color="gray.600"
          fontSize="sm"
          isTruncated
          maxH="3em"
          overflow="hidden"
        >
          {cart.product_description}
        </Text>
        <Stack w="full" direction="row" justify="space-between">
          <Text fontSize="lg" fontWeight="bold" color="blue.600">
            ${cart.product_price.toFixed(2)}
          </Text>
          <Text fontSize="sm">Qty: {cart.quantity}</Text>
        </Stack>
        <Stack direction="row" align="center" w="full" gap={4}>
          <Button
            variant="ghost"
            color="blue"
            onClick={() =>
              onUpdate(cart.id, cart.product_id, cart.quantity - 1)
            }
            disabled={cart.quantity === 1}
          >
            -
          </Button>
          <Button
            variant="ghost"
            color="blue"
            onClick={() =>
              onUpdate(cart.id, cart.product_id, cart.quantity + 1)
            }
            disabled={cart.quantity >= cart.product_stock}
          >
            +
          </Button>
          <Box flex="1" />
          <Button variant="ghost" color="red" onClick={() => onDelete(cart.id)}>
            Remove
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
