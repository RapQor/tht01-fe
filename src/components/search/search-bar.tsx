import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Search, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../services/products/hooks";

export const SearchBar = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProducts();

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((product) => product.category)
    );
    return Array.from(uniqueCategories).filter(Boolean);
  }, [products]);

  const inputWidth = useBreakpointValue({
    base: "100%",
    sm: "60%",
    md: "45%",
    lg: "500px",
  });

  const handleCardButton = () => {
    navigate("/cart");
  };

  const handleCategoryClick = async (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
      await fetchProducts(undefined); // fetch all products
    } else {
      setSelectedCategory(category);
      await fetchProducts(category);
    }
  };

  const clearFilter = async () => {
    setSelectedCategory("");
    await fetchProducts(undefined);
  };

  return (
    <Stack
      w="full"
      p={4}
      bg="white"
      boxShadow="sm"
      justify="center"
      position="sticky"
      top={0}
      zIndex={1}
      gap={4}
    >
      <Box w="full" maxW="container.xl" mx="auto">
        <Stack gap={4}>
          {/* Search and Cart Section */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            gap={4}
            align="center"
          >
            <Box position="relative" w={inputWidth}>
              <Icon
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
              >
                <Search color="grey" />
              </Icon>
              <Input
                pl={10}
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                bg="gray.50"
                color="black"
                _placeholder={{ color: "gray.500" }}
              />
            </Box>

            <IconButton
              aria-label="Shopping cart"
              variant="ghost"
              size="lg"
              shadow="sm"
              onClick={handleCardButton}
              flexShrink={0}
            >
              <ShoppingCart color="grey" />
            </IconButton>
          </Stack>

          {/* Category Filter Buttons */}
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {selectedCategory && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={clearFilter}
              >
                Clear Filter
              </Button>
            )}
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "solid" : "outline"}
                colorScheme={selectedCategory === category ? "blue" : "gray"}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
