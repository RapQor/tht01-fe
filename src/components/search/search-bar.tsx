import { Box, Icon, IconButton, Input, Stack } from "@chakra-ui/react";
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

const handleCardButton = () => {
  console.log("ini cart button");
};

export const SearchBar = () => {
  const [search, setSearch] = useState("");

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
    >
      <Box w="full" maxW="container.xl">
        <Stack direction="row" justify="space-between">
          <Box position="relative" maxW="600px" w="full">
            <Icon
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
            >
              <Search color="grey" />
            </Icon>
            <Input
              pl={10}
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.50"
              color={"black"}
              _placeholder={{ color: "black" }}
            />
          </Box>
          <IconButton
            aria-label="Shopping cart"
            variant="ghost"
            size="lg"
            shadow={"sm"}
            onClick={handleCardButton}
          >
            <ShoppingCart color="grey" />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};
