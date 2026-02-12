require("dotenv").config();
const express = require("express");
const cors = require("cors");
const algosdk = require("algosdk");

const app = express();
app.use(cors());
app.use(express.json());

const algodServer = "https://testnet-api.algonode.cloud";
const algodClient = new algosdk.Algodv2("", algodServer, "");

const mnemonic = process.env.MNEMONIC;
const account = algosdk.mnemonicToSecretKey(mnemonic);

app.post("/vote", async (req, res) => {
    try {
        const { candidate } = req.body;

        const params = await algodClient.getTransactionParams().do();
        const note = new TextEncoder().encode(`Vote:${candidate}`);

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: account.addr,
            to: account.addr,
            amount: 0,
            note,
            suggestedParams: params,
        });

        const signedTxn = txn.signTxn(account.sk);
        const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

        await algosdk.waitForConfirmation(algodClient, txId, 4);

        res.json({ success: true, txId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
