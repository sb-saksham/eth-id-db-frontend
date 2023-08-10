import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY }),
    publicProvider()
  ]
);
const {connectors} = getDefaultWallets({
  appName: "ETHEREUM ID_DB",
  projectId: import.meta.env.VITE_APP_WALLET_C_PROJECT_ID,
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketClient
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
