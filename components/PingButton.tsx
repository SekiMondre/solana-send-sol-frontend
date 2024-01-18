import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`

export const PingButton: FC = () => {

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

    const onClick = () => {
		if (!connection) {
			console.log('No connection!');
			return;
		}
		if (!publicKey) {
			console.log('Wallet not found!');
			return;
		}

		const programId = new web3.PublicKey(PROGRAM_ID);
		const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
		const transaction = new web3.Transaction();

		const instruction = new web3.TransactionInstruction({
			keys: [
				{
					pubkey: programDataAccount,
					isSigner: false,
					isWritable: true,
				},
			],
			programId,
		});

		transaction.add(instruction);
		
		console.log('Sending ping...')
		sendTransaction(transaction, connection).then((sig) => {
			console.log(sig);
		});        
    }
    
	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			<button className={styles.button}>Ping!</button>
		</div>
	)
}

