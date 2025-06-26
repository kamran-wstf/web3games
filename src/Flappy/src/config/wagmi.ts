import { http, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { bscTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [bscTestnet],
  connectors: [
    metaMask()
  ],
  transports: {
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/')
  },
})