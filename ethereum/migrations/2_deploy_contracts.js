/**
 * This file deploys all the compiled smart contracts
 */
let Blockvitae = artifacts.require("./Blockvitae.sol");
let User = artifacts.require("./User.sol");
let DB = artifacts.require("./DB.sol");

 module.exports = function (deployer) {
     // deploy contracts
      deployer
        .deploy(User)
        .then(() => {
            deployer.link(User, [DB, Blockvitae]);
            // return
            return deployer
                    .deploy(DB)
                    .then(() => {
                        // return
                        return deployer.deploy(Blockvitae, DB.address);
                    });
        });
 }