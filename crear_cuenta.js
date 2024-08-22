const algosdk = require('algosdk');

// Genera una nueva cuenta
const cuenta = algosdk.generateAccount();

console.log("Dirección de la cuenta:", cuenta.addr);
console.log("Clave privada:", cuenta.sk.toString());

