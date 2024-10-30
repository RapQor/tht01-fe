import { Stack } from "@chakra-ui/react";
import { ProductCard } from "../components/card/product-card";
import { SearchBar } from "../components/search/search-bar";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <Stack w="full" minH="100vh" gap={4} bg="gray.50">
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductCard search={search} selectedCategory={selectedCategory} />
    </Stack>
  );
};

export default Home;
