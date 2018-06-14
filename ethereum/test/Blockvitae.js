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

    // check for update owner
    it("owner updated successfully", async () => {
        // old owner
        let oldOwner = await blockvitae.owner();

        // change owner
        await blockvitae.setOwner(accounts[1]);

        let newOwner = await blockvitae.owner();

        assert(oldOwner, accounts[0]);
        assert(newOwner, accounts[1]);
    });

    // check for user social 
    it("user social accounts added successfully", async () => {
        let twitterUrl = "https://twitter.com/johndoe";
        let fbUrl = "https://facebook.com/johndoe";
        let githubUrl = "https://github.com/johndoe";
        let dribbbleUrl = "";
        let linkedUrl = "https://linkedin.com/in/johndoe";
        let behanceUrl = "";
        let mediumUrl = "https://medium.com/@johndoe";

        // create userSocial
        await blockvitae.createUserSocial(
            twitterUrl,
            fbUrl,
            githubUrl,
            dribbbleUrl,
            linkedUrl,
            behanceUrl,
            mediumUrl
        );

        // get values
        let social = await blockvitae.getUserSocial(accounts[0]);

        // assert statements
        assert(twitterUrl, social[0]);
        assert(fbUrl, social[1]);
        assert(githubUrl, social[2]);
        assert.lengthOf(dribbbleUrl, social[3].length);
        assert(linkedUrl, social[4]);
        assert.lengthOf(behanceUrl, social[5].length);
        assert(mediumUrl, social[6]);
    });
});