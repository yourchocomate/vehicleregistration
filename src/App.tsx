import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, bsc, bscTestnet, mainnet, polygon, localhost } from 'wagmi/chains'
import '@/App.css'
import NotFound from '@pages/NotFound'
import Header from '@components/Header'
import HomePage from '@pages/HomePage'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from '@contexts/AppContext'
import ProtectedRoute from '@components/ProtectedRoute'
import VehicleEntry from '@pages/VechicleEntry'
import ManageAdmins from '@pages/admin/ManageAdmins';
import AddUser from '@pages/admin/AddUser'

const chains = [arbitrum, mainnet, polygon, bsc, bscTestnet, localhost]
const projectId = '54ba7097e25703e098de8fb650c658c7'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {

  return (
    <div className="flex flex-col items-center min-h-screen py-6 px-4 bg-blob-scene-mobile md:bg-blob-scene-pc bg-cover bg-center">
      <Router>
        <WagmiConfig config={wagmiConfig}>
          <AppProvider>
            <Header />
            <div className="mx-auto max-w-screen-xl flex items-center justify-center flex-1 w-full text-center mt-2">
              <Routes>
                <Route path="/" Component={HomePage}/>
                <Route path="owner/" element={<ProtectedRoute roles={["owner"]}/>}>
                  <Route path="manage-admins" Component={ManageAdmins}/>
                  <Route path="add-user" Component={AddUser}/>
                </Route>
                <Route path="/" element={<ProtectedRoute roles={["admin", "owner"]}/>}>
                  <Route path="entry" Component={VehicleEntry}/>
                </Route>
                <Route path="*" Component={NotFound}/>
              </Routes>
            </div>
          </AppProvider>
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <Toaster
          position="bottom-left"
          reverseOrder={true}
        />
      </Router>
    </div>
  )
}

export default App
