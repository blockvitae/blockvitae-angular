/**
 * This file tests all the code inside Blockvitae contract
 * using unit tests
 */

// import contract
let BlockvitaeContract = artifacts.require("./Blockvitae.sol");

contract("Blockvitae", (accounts) => {

    // global variables
    let blockvitae = '';

    // run beforeEach before each "it" call
    beforeEach(async () => {
        blockvitae = await BlockvitaeContract.deployed();
    });

    // check if the contract is successfully deployed
    it("contract deployed successfully", async () => {
        // get the owner
        let owner = await blockvitae.owner();
        assert.equal(owner, accounts[0]);
    });

    // check if user gets created
    it("user created successfully", async () => {
        let fullName = "John";
        let lastName = "Doe";
        // CC0 license image pexels.com
        let imgUrl = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";
        let email = "john_doe@gmail.com";

        // save in contract
       await blockvitae.createUserDetail (
            fullName,
            lastName,
            imgUrl,
            email
        );

        // get the values
        let personal = await blockvitae.getUserDetail(accounts[0]);

        // assert statements
        assert(fullName, personal[0]);
        assert(lastName, personal[1]);
        assert(imgUrl, personal[2]);
        assert(email, personal[3]);
    });
    
});