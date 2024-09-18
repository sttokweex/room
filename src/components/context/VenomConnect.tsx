import { createContext, useState } from 'react';
import VenomConnect from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';

type VenomConnectContextType = {
  venomConnect: VenomConnect | undefined;
  venomProvider: ProviderRpcClient | undefined;
  setVenomProvider: (v: ProviderRpcClient) => void;
  setVenomConnect: (v: VenomConnect) => void;
  userAddress: string | undefined;
  setUserAddress: (v: string) => void;
  userBalance: number;
  setBalance: (balance: number) => void;
};

export const VenomConnectContext = createContext<VenomConnectContextType>({
  venomConnect: undefined,
  userAddress: undefined,
  venomProvider: undefined,
  setVenomProvider: () => null,
  setVenomConnect: () => null,
  setUserAddress: () => null,
  userBalance: 0,
  setBalance: () => null,
});

interface Props {
  children: React.ReactNode;
}

const VenomConnectContextComponent = ({ children }: Props) => {
  const [venomConnect, setVenomConnect] = useState<VenomConnect>();
  const [userAddress, setUserAddress] = useState('');
  const [venomProvider, setVenomProvider] = useState<ProviderRpcClient>();
  const [userBalance, setBalance] = useState(0);

  return (
    <VenomConnectContext.Provider
      value={{
        venomConnect,
        userAddress,
        venomProvider,
        userBalance,
        setBalance,
        setVenomProvider,
        setVenomConnect,
        setUserAddress,
      }}
    >
      {children}
    </VenomConnectContext.Provider>
  );
};

export default VenomConnectContextComponent;
