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
        let userName = "JDoe";
        // CC0 license image pexels.com
        let imgUrl = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";
        let email = "john_doe@gmail.com";

        // save in contract
       await blockvitae.createUserDetail (
            fullName,
            userName,
            imgUrl,
            email
        );

        // get the values
        let personal = await blockvitae.getUserDetail(accounts[0]);

        // assert statements
        assert(fullName, personal[0]);
        assert(userName, personal[1]);
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

    // check for user projects
    it("user projects added successfully", async () => {
        // projects
        let name = ["Discover", "Blockvitae"];
        let description = ["A web application to connect tourists with locals for city tours",
                            "A blockchain based curriculum viate"];
        let url = ["https://discoverapp.com", "https://blockvitae.com"];

        // create project 1
        await blockvitae.createUserProject(name[0], description[0], url[0]);

        // create project 2
        await blockvitae.createUserProject(name[1], description[1], url[1]);

        // get projects count 
        let count = await blockvitae.getProjectCount(accounts[0]);

        // get project details for each project index
        for (let i = 0; i < count.toNumber(); i++) {
             // get project 1
            let project = await blockvitae.getUserProject(accounts[0], i);
            
            // assert statements
            assert(name[i], project[i][0]);
            assert(description[i], project[i][1]);
            assert(url[i], project[i][2]);
        }
    });

    // check for user work exp
    it("user work experience added successfully", async () => {
        // work exp
        let company = ["Statusbrew", "Web Bakerz"];
        let description = ["Work with a dedicated team of 25 members from 5 different nations", 
                            "Managed and built marketing teams"];
        let position = ["Backend Engineer", "CMO"];
        let dateStart = ["2016-12-20", "2018-01-01"];
        let dateEnd = ["2017-08-18", "2018-06-15"];

        // create exp 1
        await blockvitae.createUserWorkExp(
            company[0],
            position[0],
            dateStart[0],
            dateEnd[0],
            description[0]
        );

        // create exp 2
        await blockvitae.createUserWorkExp(
            company[1],
            position[1],
            dateStart[1],
            dateEnd[1],
            description[1]
        );

        // get work exp count 
        let count = await blockvitae.getWorkExpCount(accounts[0]);

        // get work exp details for each index
        for (let i = 0; i < count.toNumber(); i++) {
             // get project 1
            let work = await blockvitae.getUserWorkExp(accounts[0], i);
            
            // assert statements
            assert(company[i], work[i][0]);
            assert(position[i], work[i][1]);
            assert(dateStart[i], work[i][2]);
            assert(dateEnd[i], work[i][3]);
            assert(description[i], work[i][4]);
        }
    });

    // check for user skills
    it("user skills added successfully", async () => {
        let skills = ["Php", "ETH Smart Contracts", "MySQL", 
            "Leadership", "Truffle", "Go", "Java Spring Boot"];

        // insert skills
        await blockvitae.createUserSkill(skills);

        // retrieve skills
        let savedSkills = await blockvitae.getUserSkills(accounts[0]);
        
        // convert bytes to Utf8
        savedSkills = savedSkills.map(skill => web3.toUtf8(skill));

        // assert statements
        for (let i = 0; i < savedSkills.length; i++) {
            assert(skills[i], savedSkills[i]);
        }
    });

     // check for user education
     it("user education added successfully", async () => {
        // education
        let organization = ["Northeastern University", "NYU"];
        let description = ["Head of NeU Cultural Committee", 
                            "Captain of NYU Basketball team"];
        let level = ["Bachelors of Science", "Master of Science"];
        let dateStart = ["2013-12-20", "2017-01-01"];
        let dateEnd = ["2017-08-18", "2019-06-15"];

        // create edu 1
        await blockvitae.createUserEducation(
            organization[0],
            level[0],
            dateStart[0],
            dateEnd[0],
            description[0]
        );

        // create edu 2
        await blockvitae.createUserEducation(
            organization[1],
            level[1],
            dateStart[1],
            dateEnd[1],
            description[1]
        );

        // get edu count 
        let count = await blockvitae.getEducationCount(accounts[0]);

        // get edu details for each index
        for (let i = 0; i < count.toNumber(); i++) {
             // get project 1
            let education = await blockvitae.getUserEducation(accounts[0], i);
        
            // assert statements
            assert(organization[i], education[i][0]);
            assert(level[i], education[i][1]);
            assert(dateStart[i], education[i][2]);
            assert(dateEnd[i], education[i][3]);
            assert(description[i], education[i][4]);
        }
    });

    // username updated successfully
    it("username updated successfully", async () => {
        let fullName = "John";
        let userName = "JDoe001";
        // CC0 license image pexels.com
        let imgUrl = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg";
        let email = "john_doe@gmail.com";

        // get the values
        let personalOld = await blockvitae.getUserDetail(accounts[0]);

        // assert statements
        assert(userName, personalOld[1]);

        // save in contract
       await blockvitae.createUserDetail (
            fullName,
            userName,
            imgUrl,
            email
        );

        // get the values
        let personal = await blockvitae.getUserDetail(accounts[0]);
       
        // assert statements
        assert(userName, personal[1]);
    });

    // get address for given userName
    it("address for given userName", async () => {
        let userName = "JDoe001";

        // get address from userName
        let addr = await blockvitae.getAddrForUserName(userName);

        assert(addr, accounts[0]);
    });
});