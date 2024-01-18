import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'

export const SendSolForm: FC = () => {

    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    const [txSig, setTxSig] = useState('');
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }

    const sendSol = event => {
        event.preventDefault()

        console.log(`Sending ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
        if (!connection || !publicKey) { return; }

        const transaction = new web3.Transaction();
        const recipientKey = new web3.PublicKey(event.target.recipient.value);

        const isValidAddress = web3.PublicKey.isOnCurve(recipientKey.toBuffer());
        if (!isValidAddress) {
            console.log(`ERROR: Invalid address ${recipientKey}`);
            return;
        }

        const instruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientKey,
            lamports: web3.LAMPORTS_PER_SOL * event.target.amount.value
        });
        transaction.add(instruction);

        sendTransaction(transaction, connection).then(sig => {
            setTxSig(sig);
        })
    }

    return (
        <div>
            { publicKey ?
                <form onSubmit={sendSol} className={styles.form}>
                    <label htmlFor="amount">Amount (in SOL) to send:</label>
                    <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                    <br />
                    <label htmlFor="recipient">Send SOL to:</label>
                    <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                    <button type="submit" className={styles.formButton}>Send</button>
                </form> :
                <span>Connect your wallet.</span>
            }
            {
                txSig ?
                    <div>
                        <p>View your transaction on </p>
                        <a href={link()}>Solana Explorer</a>
                    </div> :
                    null
            }
        </div>
    )
}