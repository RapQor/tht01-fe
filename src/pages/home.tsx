import { Stack } from "@chakra-ui/react";
import { ProductCard } from "../components/card/product-card";
import { SearchBar } from "../components/search/search-bar";

const Home = () => {
  return (
    <Stack w="full" minH="100vh" gap={4} bg="gray.50">
      <SearchBar />
      <ProductCard />
    </Stack>
  );
};

export default Home;
