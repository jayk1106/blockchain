const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const {interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'energy cloud stadium stand feel blast photo flower aisle frost unit myth',
    'https://rinkeby.infura.io/v3/8938173dff1846b5aa87599dd767e3b0'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting with deploy from account' , accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data : bytecode,
        arguments : ['Hi There!']
    })
    .send({
        gas : '1000000',    
        from : accounts[0]
    })

    console.log('Contract deployed to : ', result.options.address);
    provider.engine.stop();
}
deploy();
