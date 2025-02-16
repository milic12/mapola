"use client";
import styles from "./styles.module.css";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  // Image,
} from "@chakra-ui/react";
import loginImage from "@/public/images/login.png";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "@/utils/helpers";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();

    try {
      const { result, error } = await signIn(email, password);
      if (result && result.user.email) {
        return router.push("/admin");
      } else {
        setError("You have entered an invalid username or password");
        console.log("error.message", error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <form onSubmit={handleForm}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="example@mail.com"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                className="form-input"
                placeholder="password"
              />
            </FormControl>

            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Sign in
              </Button>
              {error && <p className={styles.errorFormMessage}>{error}</p>}
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          style={{ objectFit: "contain" }}
          className={styles.loginImage}
          src={loginImage}
          sizes="100vw"
        />
      </Flex>
    </Stack>
  );
};

export default SignIn;
