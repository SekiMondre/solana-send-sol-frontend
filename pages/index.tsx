import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { PingButton } from '../components/PingButton'
import WalletContextProvider from '../components/WalletContextProvider'
import { SendSolForm } from '../components/SendSolForm'
import { BalanceDisplay } from '../components/BalanceDisplay'

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay/>
          <PingButton/>
          <SendSolForm/>
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;