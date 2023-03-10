import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { POLYGON_CHAINS, SITE_NAME, INFURA_API_KEY } from '../utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { siwe } from '../siwe'
import { infuraProvider } from 'wagmi/providers/infura'

interface Props {
  children: ReactNode
}

const { provider, webSocketProvider } = configureChains(
  [...POLYGON_CHAINS, mainnet],
  [infuraProvider({ apiKey: INFURA_API_KEY, priority: 0, stallTimeout: 1_000 }), publicProvider({ priority: 1, stallTimeout: 1_000 })]
)

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: true,
    provider,
    webSocketProvider,
    chains: POLYGON_CHAINS,
  })
)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()

  return (
    <WagmiConfig client={client}>
      <siwe.Provider>
        <ConnectKitProvider mode={colorMode}>{props.children}</ConnectKitProvider>
      </siwe.Provider>
    </WagmiConfig>
  )
}
