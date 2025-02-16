import {
  Container,
  Box,
  Stack,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import Cart from "./Cart";
import { useStateContex } from "@/context/StateContext";
import Admin from "./admin/Admin";
import { usePathname, useSearchParams } from "next/navigation";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, signOutUser } =
    useStateContex();
  const path = usePathname();

  const handleSignOut = (e: any) => {
    e.preventDefault();
    signOutUser();
  };

  return (
    <>
      <Box
        position="fixed"
        as="nav"
        w="100%"
        css={{ backdropFilter: "blur(10px)" }}
        zIndex={4}
      >
        <Container className="navbar-main-container" maxW="container.xl">
          <Box className="desktop-navigation">
            <Flex>
              <Box className="navbar-logo-image">
                <Link href="/">
                  <Image
                    borderRadius="full"
                    boxSize="80px"
                    src="/images/mapola-logo.png"
                    alt="Mapola Logo"
                  />
                </Link>
              </Box>
              <Box className="desktop-nav-links">
                <Link href="/about">O nama</Link>
                <Link href="/contact">Kontakt</Link>
                <Link href="/personal-map">Personaliziraj</Link>
                <Link href="/faq">FAQ</Link>
              </Box>
            </Flex>
            <Box className="cart-desktop-container">
              <button
                type="button"
                className="cart-icon"
                onClick={() => setShowCart(true)}
              >
                <AiOutlineShoppingCart size={35} />
                <Text as="span" className="cart-item-qty">
                  {totalQuantities}
                </Text>
              </button>
            </Box>
            {path === "/admin" && (
              <Box className="cart-desktop-container">
                <Button colorScheme="red" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </Box>
            )}
            {showCart && <Cart />}
          </Box>
          <Box className="mobile-menu-container">
            <Box ml={2} className="mobile-menu">
              <Stack mr={10}>
                <button
                  type="button"
                  className="cart-icon"
                  onClick={() => setShowCart(true)}
                >
                  <AiOutlineShoppingCart size={35} />
                  <Text as="span" className="cart-item-qty">
                    {totalQuantities}
                  </Text>
                </button>
              </Stack>
              {showCart && <Cart />}
              <Menu isLazy id="navbar-menu">
                <MenuButton
                  as={IconButton}
                  icon={<GiHamburgerMenu />}
                  variant="outline"
                  aria-label="Options"
                />
                <MenuList color="#686461" backgroundColor={"grey.700"}>
                  <MenuItem as={Link} href="/">
                    <IoHome />
                  </MenuItem>
                  <MenuItem as={Link} href="/about">
                    O nama
                  </MenuItem>
                  <MenuItem as={Link} href="/contact">
                    Kontakt
                  </MenuItem>
                  <MenuItem as={Link} href="/personal-map">
                    Personaliziraj
                  </MenuItem>
                  <MenuItem as={Link} href="/faq">
                    FAQ
                  </MenuItem>
                  {path === "/admin" && (
                    <MenuItem>
                      <Button colorScheme="red" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
