import { useState, useEffect } from 'react';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Flex, HStack, Container, Heading, Image, Text } from '@chakra-ui/react';
import Clip from './Clip';
import abiInfos from './contractJson/Exmateria.json';  // Ensure the ABI is properly imported
import { useReadContract, useAccount } from 'wagmi';  // Corrected hook name
import Mint from './Mint';  // Import the Mint component

function App() {
  const { isConnected } = useAccount();
  const [totalSupply, setTotalSupply] = useState(null);

  // Use wagmi's useReadContract hook to read totalSupply from the contract
  const { data: totalSupplyData} = useReadContract({
    address: '0xB2431ea9a006fa09A9c006BAE54e625cc690709e',  // Your contract address
    abi: abiInfos.abi,  // ABI of the contract
    functionName: 'totalSupply',  // Contract function to read
    watch: true,  // Auto-update the value if it changes
  });

  // Update totalSupply state whenever totalSupplyData is fetched
  useEffect(() => {
    if (totalSupplyData) {
      setTotalSupply(Number(totalSupplyData));  // Convert to a number
    }
  }, [totalSupplyData]);

  useEffect(()=>{
    if(isConnected) {
    }
  }, [isConnected]
  )
 
  const getDatas = async () => {
    try {
    
      const { data: contract} = useReadContract({
        address: '0xB2431ea9a006fa09A9c006BAE54e625cc690709e',  // Your contract address
        abi: abiInfos.abi,  // ABI of the contract
        functionName: 'totalSupply',  // Contract function to read
        watch: true,  // Auto-update the value if it changes
      })
      setTotalSupply(Number(contract));
    } catch (error) {
      console.error("Error fetching contract data", error);
    }
  };
  

  return (
    <div className="App">
      <Flex direction={'row'} alignItems={'center'} justifyContent={'space-between'} margin={'20px'} marginTop={'0px'}>
        <Box p="2rem">
          <Image className="logo" src="/Logo.png" alt="Logo Daywon" />
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <HStack direction={'row'} justifyContent={"space-around"}>
        <Clip />
        <Container margin={0} centerContent>
          <Box textColor='#ffff' marginBottom={'50px'}>
            <Heading as={'h1'}>Ex-Materia</Heading>
          </Box>

          <Box textColor={'white'} fontSize={'large'} textAlign={'center'}>
            <p>Ce projet est la première version. Pour voir les NFTs, connectez votre wallet.</p>
          </Box>

          <Box marginTop={'10px'}>
            {isConnected ? (
              <Mint getDatas={getDatas} totalSupply={totalSupply} />
            ) : (
              <Box>
                <Text fontSize="xl" color="red.500">Veuillez connecter votre wallet pour minter des NFTs</Text>
              </Box>
            )}
          </Box>
        </Container>
      </HStack>
    </div>
  );
}

export default App;
