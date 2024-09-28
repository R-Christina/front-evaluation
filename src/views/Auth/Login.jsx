import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logoImage from "assets/img/logo.jpg";
import { authInstance } from "../../axiosConfig";

function Login() {
  const titleColor = useColorModeValue("green.500", "green.400");
  const textColor = useColorModeValue("gray.400", "white");

  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matricule.trim() === "" || password.trim() === "") {
      setError("Information incomplète");
    } else {
      setError("");
      try {
        const response = await authInstance.post("/Auth/login", {
          matricule,
          password,
        });

        // Stocker le token dans le localStorage
        localStorage.setItem("token", response.data.token);
        const userRole = response.data.user.role_id;

        if (userRole == 1) {
          navigate("/dashboard/rh", {
            state: {
              userName: response.data.user.emp_nom,
              userSurname: response.data.user.emp_prenom,
            },
          });
        } else if (userRole == 2) {
          navigate("/dashboard/collaborateur", {
            state: {
              userName: response.data.user.emp_nom,
              userSurname: response.data.user.emp_prenom,
            },
          });
        } else if (userRole == 3) {
          navigate("/dashboard/superieur", {
            state: {
              userName: response.data.user.emp_nom,
              userSurname: response.data.user.emp_prenom,
            },
          });
        } else {
          // Rediriger vers une page par défaut si le rôle n'est pas reconnu
          navigate("/dashboard/default", {
            state: {
              userName: response.data.user.emp_nom,
              userSurname: response.data.user.emp_prenom,
            },
          });
        }
      } catch (err) {
        // Vérifier si l'erreur est un message d'erreur provenant de l'API
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError("Une erreur s'est produite");
        }
      }
    }
  };

  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Flex
        h="100%"
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="center"
        alignItems="center"
        mb="0px"
        pt={{ sm: "0px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
          boxShadow="lg"
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p={{ base: "20px", md: "48px" }} // Adjust padding for smaller screens
            mt="0px" // Remove top margin to avoid unnecessary space
          >
            {/* Brand Logo */}
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="20px"
              alignItems="left"
            >
              <Box mb="0px">
                <img src={logoImage} alt="Logo" style={{ maxWidth: "100px" }} />
              </Box>
            </Flex>

            {/* Form Heading */}
            <Heading
              color={titleColor}
              fontSize="32px"
              mb="10px"
              textAlign="left"
            >
              Identifiez-vous
            </Heading>
            <Text
              mb="24px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
              textAlign="left"
            >
              Entrer votre identifiant et votre mot de passe
            </Text>

            {/* Form */}
            <FormControl onSubmit={handleSubmit} as="form">
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Identifiant
              </FormLabel>
              <Input
                borderRadius="0px"
                mb="16px" // Reduce margin-bottom to optimize space
                fontSize="sm"
                type="text"
                placeholder="Votre matricule"
                size="lg"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Mot de passe
              </FormLabel>
              <Input
                borderRadius="0px"
                mb="24px" // Reduce margin-bottom for password field
                fontSize="sm"
                type="password"
                placeholder="Votre mot de passe"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Text color="red.500" mb="0px" mt="-20px">
                  {error}
                </Text>
              )}
              <Button
                borderRadius="0px"
                fontSize="15px"
                type="submit"
                bg="green.500"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{ bg: "green.300" }}
                _active={{ bg: "green.300" }}
              >
                Valider
              </Button>
            </FormControl>

            {/* Forgot Password */}
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Link color="gray" as="span" ms="5px" fontWeight="semi-medium">
                Mot de passe oublié ?
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login;
