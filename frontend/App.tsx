import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp/dist/providers';
import React from 'react';
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';

// import Hello from '../artifacts/contracts/Hello.sol/Hello.json';

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
  headerOne: { fontSize: 30}
});

const shouldDeployContract = async (web3, abi, data, from: string) => {
  const deployment = new web3.eth.Contract(abi).deploy({ data });
  const gas = await deployment.estimateGas();
  const {
    options: { address: contractAddress },
  } = await deployment.send({ from, gas });
  return new web3.eth.Contract(abi, contractAddress);
};

let ethBal = '0'
export default function App(): JSX.Element {
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState<string>('Loading...');
  const web3 = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4f719d05d3604e9dbfb33fe8cc75a116')),
    [HARDHAT_PORT]
    );
  web3.eth.getBalance('0x06cC48b1235b92B8A173223127b88E756864f8fF')
    .then((bal) => {
      console.log('bal: ', bal)
      console.log('formated bal: ', web3.utils.fromWei(bal) )
      ethBal = web3.utils.fromWei(bal) })
  React.useEffect(() => {
    void (async () => {
      const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
      // const contract = await shouldDeployContract(
      //   web3,
      //   Hello.abi,
      //   Hello.bytecode,
      //   address
      // );
      setMessage('React Native');
    })();
  }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  
  const signTransaction = React.useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  return (
    <WalletConnectProvider 
      bridge="https://bridge.walletconnect.org"
      clientMeta={{
        description: 'Connect with WalletConnect',
        url: 'https://walletconnect.org',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'WalletConnect',
      }}
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
      storageOptions={{
        asyncStorage: AsyncStorage
      }}
      
    >
      <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
        <Text style={styles.headerOne}>NftDeck</Text>
        <Text testID="tid-message">{message}</Text>
        {!connector.connected && (
          <Button title='Connect a Wallet' onPress={connectWallet} />
        )}
        {!!connector.connected && (
          <>
            <Text>Eth Balance: {ethBal}</Text>
            <Text>NFT Balance (est): $451.02</Text>
            <TouchableOpacity onPress={signTransaction}>
              <Text>Sign a Transaction</Text>
            </TouchableOpacity>
            <Text>{connector.accounts}</Text>
            <Text>{}</Text>
            <TouchableOpacity onPress={killSession}>
              <Text>Kill Session</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </WalletConnectProvider>

    
  );
}