import {
  Box,
  Button,
  Container,
  Image,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components/ui/alert";
import { useCreateCart } from "../services/cart/hooks";
import { useProducts } from "../services/products/hooks";
import { Product } from "../services/products/types";

const LoadingSkeleton = () => (
  <Container maxW="6xl" py={8}>
    <Stack gap={8}>
      <Skeleton h="400px" w="full" />
      <Stack gap={4}>
        <Skeleton h="40px" w="300px" />
        <Skeleton h="20px" w="200px" />
        <Skeleton h="100px" w="full" />
        <Stack direction="row" justify="space-between">
          <Skeleton h="30px" w="150px" />
          <Skeleton h="30px" w="150px" />
        </Stack>
      </Stack>
    </Stack>
  </Container>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const { getProduct } = useProducts();
  const {
    createCart,
    loading: cartLoading,
    error: cartError,
  } = useCreateCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id && !product) {
        // Tambahkan pengecekan jika product belum ada
        const productData = await getProduct(parseInt(id));
        if (productData) {
          setProduct(productData);
        } else {
          navigate("/");
        }
      }
    };
    fetchProduct();
  }, [id, getProduct, navigate, product]);

  const handleAddToCart = async () => {
    if (!product || quantity === 0) {
      alert("Please add at least 1 item to the cart.");
      return;
    }

    try {
      await createCart(product.id || 0, quantity);
      setQuantity(0);
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  if (!product) return <LoadingSkeleton />;

  return (
    <Container maxW="6xl" py={8}>
      <Stack direction={{ base: "column", md: "row" }} gap={8} align="start">
        <Box w={{ base: "full", md: "50%" }}>
          <Image
            src="https://images.squarespace-cdn.com/content/v1/58928af6bf629adabaeae969/1575315322740-XHLPFEZD2VG6DLVUN9HW/ke17ZwdGBToddI8pDm48kDEDYh4Y0JGhR6hzuwcJ44gUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcz6bs2FkMoqlrQIzq4g5ogDqXr_T7rMikH_TfPkEE4wwzGwe9KEhUq6A0DxOZf-75/IMG_1570.jpg"
            alt={product.name}
            w="full"
            h="400px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        <Stack gap={6} w={{ base: "full", md: "50%" }}>
          <Stack gap={4}>
            <Text fontSize="3xl" fontWeight="bold" color="blue.600">
              {product.name}
            </Text>

            <Stack direction="row" justify="space-between" align="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ${product.price.toFixed(2)}
              </Text>
              <Text
                color={product.stock > 0 ? "green.500" : "red.500"}
                fontSize="lg"
              >
                {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
              </Text>
            </Stack>

            <Text color="gray.700" fontSize="md" lineHeight="tall">
              {product.description}
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              Category: {product.category}
            </Text>

            <Stack direction="row" align="center" gap={4}>
              <Input
                type="number"
                min={0}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                w="120px"
                size="lg"
              />
              <Button
                colorScheme="blue"
                size="lg"
                disabled={product.stock === 0 || quantity === 0}
                onClick={handleAddToCart}
                isLoading={cartLoading}
                w="full"
              >
                Add to Cart
              </Button>
            </Stack>

            {cartError && <Alert variant="destructive">{cartError}</Alert>}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProductDetail;
