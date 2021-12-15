
if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') // checks if both MetaMask and a Web3 library exist
	web3 = new Web3(web3.currentProvider) // create a new web3 object relative to current web3 provider (i.e. MataMask)
else 
	alert('MetaMask not installed and/or Web3 library not installed');
console.log(web3.currentProvider);

const web3Version = document.getElementById('web3Version');
web3Version.innerHTML = web3.version;

//const GANACHE_CONTRACT_ADDRESS = "0x709bB54b4a5941a4062a413484CF1659a6A84313" //Ganache contract address (value-checker workspace)
const ROPSTEN_CONTRACT_ADDRESS = "0xf5fa16c0aacf3e21fd002864d4c7ddffe7ee7b1c" //Rospten contract addres

var simpleContract = new web3.eth.Contract(
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "returnValue",
				"type": "bool"
			}
		],
		"name": "valueEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "x",
				"type": "uint8"
			}
		],
		"name": "callMatcher",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "x",
				"type": "uint8"
			}
		],
		"name": "sendMatcher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
], 
ROPSTEN_CONTRACT_ADDRESS); // use the relevant testnet contract address

console.log(simpleContract);
const showContractAccount = document.querySelector('.showContractAccount');
showContractAccount.textContent = ROPSTEN_CONTRACT_ADDRESS;

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
//const showContractAccount = document.querySelector('.showContractAccount');
const showResultFromEvent = document.querySelector('.eventResult');
const showResultFromCall = document.querySelector('.callResult');

ethereumButton.addEventListener('click', () => { // async arrow callback function
		getAccount();
	});

var account;

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); //call to MetaMask
  account = accounts[0];
  console.log(account);
  showAccount.textContent = account; // also showAccount.innerHTML
  //showContractAccount.textContent = ROPSTEN_CONTRACT_ADDRESS;
}

var value;
async function sendMatcher() {
	showResultFromEvent.textContent = null;
	const number = parseInt(document.getElementById("valueSend").value);
	//.send() returns the transaction object as a promise - await returns it asynchronously
	const receipt = await simpleContract.methods.sendMatcher(number).send({from: account, gas:2000000})
	showResultFromEvent.textContent = receipt.events.valueEvent.returnValues['returnValue'];
}

async function callMatcher() {
	showResultFromCall.textContent = null;	
	const number = parseInt(document.getElementById("valueCall").value);
	//.call() does not generate a Tx, hence no receipt is issued by the EVM 
	//instead it returns the Matcher() return value (await makes it asynchronously)
	const result = await simpleContract.methods.callMatcher(number).call({from: account})
	showResultFromCall.textContent = result
};





	
	
