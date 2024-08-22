require('dotenv').config()

const algosdk = require('algosdk');
const algokit = require('@algorandfoundation/algokit-utils');

const algoClientConfig =  {server: 'http://localhost', port: '4001', token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}

const account = algosdk.mnemonicToSecretKey(process.env.DISPENSEER_MNEMONIC);

const client = algokit.getAlgoClient(algoClientConfig);

async function crearTransaccion() {
    // Obtener los parámetros de transacción sugeridos
    let params = await client.getTransactionParams().do();

    // Crear la transacción
    let txn = {
        "from": account.addr,
        "to": "LGCHMWWUUE2EANBPNEDPEAT6MGX6LQYYJ7ZJTHHH4OOYF6J3UQDGFWNDYI", // Reemplazar con la dirección de destino
        "fee": algosdk.ALGORAND_MIN_TX_FEE,
        "amount": 1000000, // 1 Algo = 1,000,000 microalgos
        "suggestedParams": params,
    };

    // Firmar la transacción
    let signedTxn = algosdk.signTransaction(txn, account.sk);

    // Enviar la transacción
    let tx = await client.sendRawTransaction(signedTxn.blob).do();

    console.log("ID de la transacción: ", tx.txId);
}

crearTransaccion().catch(console.error);
