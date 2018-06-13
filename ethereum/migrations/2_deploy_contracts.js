/**
 * This file deploys all the compiled smart contracts
 */
let Blockvitae = artifacts.require("./Blockvitae.sol")

 module.exports = function(deployer) {
     // deploy contracts
     deployer
        .deploy(Blockvitae);
 }