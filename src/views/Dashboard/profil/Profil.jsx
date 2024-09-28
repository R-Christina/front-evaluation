// Profil.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Text, Flex } from '@chakra-ui/react';
import Header from '../../../components/header/Header'; // Assure-toi que le chemin est correct

function Profil() {
    const location = useLocation();
    const { userName, userSurname } = location.state || { userName: '', userSurname: '' };

    return (
        <div>
            <Header />
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    <Text fontSize="xl" fontWeight="bold">
                        Nom: {userName}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold">
                        Prénom: {userSurname}
                    </Text>
                </Box>
            </Flex>
        </div>
    );
}
export default Profil;
