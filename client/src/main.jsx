import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
// Importations nécessaires
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from 'wagmi';

// Configuration de RainbowKit et Wagmi
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID', // Remplacez par votre ID de projet
  chains: [mainnet, sepolia ],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/DaG7DzAjO36sHS27q87gMhyWyBGkqY24'),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/DaG7DzAjO36sHS27q87gMhyWyBGkqY24'),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ChakraProvider>
  </StrictMode>,
);
