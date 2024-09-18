import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, useToast, Spinner } from '@chakra-ui/react';
import { useWalletClient, useWaitForTransactionReceipt } from 'wagmi'; // Import hooks
import abiInfos from './contractJson/Exmateria.json'; // Import ABI
import { ethers } from 'ethers';

function Mint({ getDatas, totalSupply }) {
    const { data: signer } = useWalletClient();  // Get the wallet signer
    const toast = useToast();
    const [isMinting, setIsMinting] = useState(false);
    const [transactionHash, setTransactionHash] = useState(null);  // State to store the transaction hash

    // useWaitForTransactionReceipt to wait for the transaction to be confirmed
    const { data: receipt, isError, isLoading } = useWaitForTransactionReceipt({
        hash: transactionHash,  // Pass the transaction hash
        wait: true,  // Automatically wait for confirmation
    });

    // This effect runs when the transaction receipt is available
    useEffect(() => {
        if (receipt && !isError) {
            getDatas();  // Call getDatas to refresh data

            toast({
                title: 'Congratulations',
                description: 'Your NFT(s) have been minted!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

        if (isError) {
            toast({
                title: 'Error',
                description: 'An error occurred, please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [receipt, isError, toast, getDatas]);

    // Function to handle minting of NFTs
    const handleMint = async (numberOfNFTs) => {
        setIsMinting(true);
        try {
            let overrides = {
                value: ethers.parseEther('0.0000001').valueOf(numberOfNFTs),
            };

            const contract = new ethers.Contract(
                '0xB2431ea9a006fa09A9c006BAE54e625cc690709e',
                abiInfos.abi,
                signer
            );

            const transaction = await contract.mint(numberOfNFTs, overrides);

            // Set the transaction hash to trigger the receipt wait
            setTransactionHash(transaction.hash);
        } catch (e) {
            console.error(e);
            toast({
                title: 'Error',
                description: 'An error occurred, please try again',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <Flex w="100%" h="100%" justifyContent="center" p="2rem">
            {isMinting || isLoading ? (
                <Flex alignItems="center">
                    <Spinner color="pink.500" size="xl" />
                    <Text ml="1rem" fontSize="32px" color={'white'}>
                        We are minting your NFT(s) :D !
                    </Text>
                </Flex>
            ) : (
                <Flex w="100%" h="100%" alignItems="center">
                    <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontSize="24px" color={'white'}>
                            NFTs Sold: {totalSupply} / 13
                        </Text>
                        <Text mt="1rem" fontSize="16px" color={'white'}>
                            Each NFT costs 0.0000001 ETH (excluding gas fees)
                        </Text>
                        <Flex mt="1rem">
                            <Button colorScheme="pink" onClick={() => handleMint(1)}>
                                Mint 1 NFT
                            </Button>
                            <Button ml="1rem" colorScheme="pink" onClick={() => handleMint(2)}>
                                Mint 2 NFTs
                            </Button>
                            <Button ml="1rem" colorScheme="pink" onClick={() => handleMint(3)}>
                                Mint 3 NFTs
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}

export default Mint;
