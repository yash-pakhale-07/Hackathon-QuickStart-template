import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

const algodServer = "https://testnet-api.algonode.cloud";
const algodClient = new algosdk.Algodv2("", algodServer, "");

export async function connectWallet() {
    const accounts = await peraWallet.connect();
    return accounts[0];
}

export async function sendVoteTransaction(sender, candidate) {
    const params = await algodClient.getTransactionParams().do();

    const note = new TextEncoder().encode(`Vote:${candidate}`);

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: sender,
        amount: 0,
        note: note,
        suggestedParams: params,
    });

    const signedTxn = await peraWallet.signTransaction([txn]);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

    await algosdk.waitForConfirmation(algodClient, txId, 4);

    return txId;
}
