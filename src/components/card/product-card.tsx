import { Button, Text, Image, Grid, Stack, Skeleton } from "@chakra-ui/react";
import { useProducts } from "../../services/products/hooks";
import { Product } from "../../services/products/types";

const LoadingSkeleton = () => (
  <Grid
    templateColumns={[
      "1fr",
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
      "repeat(4, 1fr)",
    ]}
    gap={6}
    w="full"
    p={4}
  >
    {[1, 2, 3, 4].map((item) => (
      <Stack
        key={item}
        w="full"
        h="400px"
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Skeleton h="200px" w="full" />
        <Stack p={4} gap={2} w="full">
          <Skeleton h="20px" w="full" />
          <Skeleton h="20px" w="70%" />
          <Skeleton h="20px" w="40%" />
        </Stack>
      </Stack>
    ))}
  </Grid>
);

const handleAddToCart = () => {
  console.log("Add to cart");
};

const SingleProductCard = ({ product }: { product: Product }) => (
  <Stack
    w="full"
    h="400px"
    bg="white"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    transition="transform 0.2s"
    _hover={{ transform: "scale(1.02)" }}
  >
    <Image
      src="https://images.squarespace-cdn.com/content/v1/58928af6bf629adabaeae969/1575315322740-XHLPFEZD2VG6DLVUN9HW/ke17ZwdGBToddI8pDm48kDEDYh4Y0JGhR6hzuwcJ44gUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcz6bs2FkMoqlrQIzq4g5ogDqXr_T7rMikH_TfPkEE4wwzGwe9KEhUq6A0DxOZf-75/IMG_1570.jpg"
      alt={product.name}
      h="200px"
      w="full"
      objectFit="cover"
    />
    <Stack p={4} gap={2} w="full" alignItems="flex-start">
      <Text fontSize="xl" fontWeight="bold" color="blue.600" isTruncated>
        {product.name}
      </Text>
      <Text
        color="gray.600"
        fontSize="sm"
        isTruncated
        maxH="3em"
        overflow="hidden"
      >
        {product.description}
      </Text>
      <Stack w="full" direction="row" justify="space-between">
        <Text fontSize="lg" fontWeight="bold" color="blue.600">
          ${product.price.toFixed(2)}
        </Text>
        <Text color={product.stock > 0 ? "green.500" : "red.500"} fontSize="sm">
          {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
        </Text>
      </Stack>
      <Button
        variant="ghost"
        colorScheme="blue"
        w="full"
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        color={product.stock > 0 ? "blue.600" : "blue.400"}
      >
        Add to Cart
      </Button>
    </Stack>
  </Stack>
);

export const ProductCard = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSkeleton />;

  if (error)
    return (
      <Stack w="full" p={8}>
        <Text color="red.500" fontSize="lg">
          Error: {error}
        </Text>
        <Button colorScheme="blue" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Stack>
    );

  // Pastikan products adalah array dan memiliki nilai
  const productList = Array.isArray(products) ? products : [];

  if (!productList.length)
    return (
      <Stack w="full" p={8}>
        <Text color="gray.500" fontSize="lg">
          No products found
        </Text>
      </Stack>
    );

  return (
    <Grid
      templateColumns={[
        "1fr",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap={6}
      w="full"
      p={4}
    >
      {productList.map((product) => (
        <SingleProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
