import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import loginImage from "assets/img/loginImage2.jpg";
import logoImage from "assets/img/logo.jpg";

function Login() {
  const titleColor = useColorModeValue("green.500", "green.400");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="40px"
            mt={{ md: "150px", lg: "0px" }}
            alignItems="left" // Center align items in the column
          >
            <Box mb="0px"> {/* Add margin bottom for spacing */}
              <img src={logoImage} alt="Logo" style={{ maxWidth: "100px" }} /> {/* Adjust size as needed */}
            </Box>
            </Flex>

            <Heading color={titleColor} fontSize="32px" mb="10px">
              Identifiez-vous
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Entrer votre identifiant et votre mot de passe
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Identifiant
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Votre matricule"
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Mot de passe
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="mot de passe"
                placeholder="Votre mot de passe"
                size="lg"
              />
              <Button
                fontSize="15px"
                type="submit"
                bg="green.500"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "green.300",
                }}
                _active={{
                  bg: "green.300",
                }}
              >
                Valider
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
                <Link color="gray" as="span" ms="5px" fontWeight="medium">
                  Mot de passe oublié ?
                </Link>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100vh"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={loginImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="0px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Login;
