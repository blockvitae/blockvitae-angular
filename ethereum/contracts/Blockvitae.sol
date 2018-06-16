/**
 * This contract acts as a controller for front-end
 * requests. The DB file is separate incase, solidity adds
 * functionality to return structs. In that case, only
 * this contract needs to be redeployed and data migration
 * will not be needed as the data is stored in DB.sol
 * contract.
 */
pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2; // experimental

// import user.sol contract
import "./User.sol";
import "./DB.sol";

// @title Blockvitae for CV
contract Blockvitae {

    using User for User.UserMain;

    // DB
    DB public dbContract;

    // owner of the contract
    address public owner;

    // checks if the user has an account or not
    modifier userExists() {
        require (dbContract.isExists(msg.sender));
        _;
    }

    // checks if the address is not zero
    modifier addressNotZero() {
        require (msg.sender != address(0));
        _;
    }

    // check for the owner
    modifier isOwner() {
        require(owner == msg.sender);
        _;
    }

    // sets the owner of the contract
    constructor(DB _dbContract) public {
        dbContract = _dbContract;
        owner = msg.sender;

        // set this contract as the owner of DB contract
        // to avoid any external calls to DB contract
        // All calls to DB contract should pass through this
        // contract
        dbContract.setOwner(address(this));
    } 

    // @description
    // Change Owner function incase Blockviate is redeployed
    // old Blockviate should be able to update the owner to new 
    // Blockviate.
    //
    // @param address _owner
    // address of the new owner 
    function setOwner(address _owner) public isOwner {
        owner = _owner;
    }

    // @description
    // creates UserDetail struct
    //
    // @param string _fullName 
    // full name of the user
    //
    // @param string _userName 
    // username of the user
    //
    // @param string _imgUrl 
    // profile image url of the user
    //
    // @param string _email 
    // email of the user
    function createUserDetail(
        string _fullName,
        string _userName,
        string _imgUrl,
        string _email
    )
    public
    addressNotZero
    {
        // create userDetail struct
        User.UserDetail memory personal = User.setUserDetail(
            _fullName,
            _userName,
            _imgUrl,
            _email
        );

        // insert into the database
        dbContract.insertUserDetail(personal, msg.sender);
    }

    // @description
    // create UserSocial struct and insers in DB
    //
    // @param string _twitterUrl
    // twitter url of the user
    //
    // @param string _fbUrl
    // facebook url of the user
    //
    // @param string _githubUrl
    // github url of the user
    //
    // @param string _linkedInUrl
    // linked in url of the user
    //
    // @param string _behanceUrl
    // behance url of the user
    //
    // @param string _mediumUrl
    // medium url of the user
    function createUserSocial(
        string _twitterUrl,
        string _fbUrl,
        string _githubUrl,
        string _dribbbleUrl,
        string _linkedInUrl,
        string _behanceUrl,
        string _mediumUrl
    )
    public
    addressNotZero
    userExists
    {
        // create userSocial struct
        User.UserSocial memory social = User.setUserSocial(
            _twitterUrl,
            _fbUrl,
            _githubUrl,
            _dribbbleUrl,
            _linkedInUrl,
            _behanceUrl,
            _mediumUrl
        );

        // insert into the database
        dbContract.insertUserSocial(social, msg.sender);
    }

    // @description
    // creates UserProject struct and insert in DB
    //
    // @param string _name
    // name of the project
    //
    // @param string _description 
    // description of the project
    //
    // @param string _url
    // url of the project
    function createUserProject(
        string _name,
        string _description,
        string _url
    )
    public
    addressNotZero
    userExists
    {
        // create UserProject struct
        User.UserProject memory project = User.setUserProject(
            _name,
            _description,
            _url
        );

        // insert into the database
        dbContract.insertUserProject(project, msg.sender);
    }

    // @description
    // creates UserWorkExp struct and inserts in DB
    //
    // @param string _company
    // name of the company or organization
    //
    // @param string _position
    // position held in the given company
    //
    // @param string _dateStart
    // start date of the job
    //
    // @param string _dateEnd
    // end date of the job
    //
    // @param string _description
    // description of the work experience
    function createUserWorkExp(
        string _company,
        string _position,
        string _dateStart,
        string _dateEnd,
        string _description
    )
    public
    addressNotZero
    userExists
    {
        // create UserWorkExp struct
        User.UserWorkExp memory work = User.setUserWorkExp(
            _company,
            _position,
            _dateStart,
            _dateEnd,
            _description
        );

        // insert in to database
        dbContract.insertUserWorkExp(work, msg.sender);
    }

    // @description
    // creates UserSkill struct and inserts in DB
    //
    // @param bytes32[] _skills
    // array of skills
    function createUserSkill(bytes32[] _skills) public addressNotZero userExists {
        // create user skill struct
        User.UserSkill memory skills = User.setUserSkill(_skills);

        // insert into DB
        dbContract.insertUserSkill(skills, msg.sender);
    }

    // @description
    // creates UserEducation struct and inserts in DB
    //
     // @param string _organization
    // name of the organization
    //
    // @param string _level
    // education level held in the given organization
    //
    // @param string _dateStart
    // start date of the education
    //
    // @param string _dateEnd
    // end date of the education
    //
    // @param string _description
    // description of the education
    //
    // @return UserEducation
    // UserEducation struct for the given values
    function createUserEducation(
        string _organization,
        string _level,
        string _dateStart,
        string _dateEnd,
        string _description 
    )
    public
    addressNotZero
    userExists
    {
        // create UserEducation struct
        User.UserEducation memory education = User.setUserEducation(
            _organization,
            _level,
            _dateStart,
            _dateEnd,
            _description
        );

        // insert in the database
        dbContract.insertUserEducation(education, msg.sender);
    }

    // @description
    // gets count of total education added
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return uint
    // count of the total education for the given user
    function getEducationCount(address _user)
    public
    view
    returns(uint) {
        return dbContract.findUserEducation(_user).length;
    }

    // @description
    // gets the user education with the given index for the given user
    //
    // @param address _user
    // address of the user who's education is to be searched
    //
    // @param uint index
    // index of the education to be searched
    //
    // @return (string, string, string, string, string)
    // organization, level, dateStart, dateEnd
    // and description of the education with given index
    function getUserEducation(address _user, uint index)
    public
    view
    returns(string, string, string, string, string) {
        User.UserEducation[] memory education = dbContract.findUserEducation(_user);

        string memory organization = education[index].organization;
        string memory level = education[index].level;
        string memory dateStart = education[index].dateStart;
        string memory dateEnd = education[index].dateEnd;
        string memory description = education[index].description;
    
        return (organization, level, dateStart, dateEnd, description);
    }


    // @description
    // gets the array of skills of the user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return bytes32[]
    // bytes32 array of skills of the user with given address
    function getUserSkills(address _user) public view returns(bytes32[]) {
        return dbContract.findUserSkill(_user).skills;
    }

    // @description
    // Solidity doesn't allow to return array of strings
    // Therefore, get count of projects first and
    // then get each project one at a time from front end
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return uint
    // count of the total projects for the given user
    function getProjectCount(address _user) 
    public 
    view 
    returns(uint) {
        return dbContract.findUserProject(_user).length;
    }

    // @description
    // gets the user project with the given index for the given user
    //
    // @param address _user
    // address of the user who's projects are to be searched
    //
    // @param uint index
    // index of the project to be searched
    //
    // @return (string, string, string)
    // name, description and url of the project with given index
    function getUserProject(address _user, uint index)
    public
    view
    returns(string, string, string) {
        User.UserProject[] memory projects = dbContract.findUserProject(_user);

        string memory name = projects[index].name;
        string memory description = projects[index].description;
        string memory url = projects[index].url;
    
        return (name, description, url);
    }

    // @description
    // gets count of total work experiences added
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return uint
    // count of the total work exp for the given user
    function getWorkExpCount(address _user) 
    public 
    view 
    returns(uint) {
        return dbContract.findUserWorkExp(_user).length;
    }

    // @description
    // gets the user work exp with the given index for the given user
    //
    // @param address _user
    // address of the user who's work exp are to be searched
    //
    // @param uint index
    // index of the work exp to be searched
    //
    // @return (string, string, string, string, string)
    // company, position, dateStart, dateEnd
    // and description of the work exp with given index
    function getUserWorkExp(address _user, uint index)
    public
    view
    returns(string, string, string, string, string) {
        User.UserWorkExp[] memory work = dbContract.findUserWorkExp(_user);

        string memory company = work[index].company;
        string memory position = work[index].position;
        string memory dateStart = work[index].dateStart;
        string memory dateEnd = work[index].dateEnd;
        string memory description = work[index].description;
    
        return (company, position, dateStart, dateEnd, description);
    }

    // @description 
    // returns UserDetail struct values
    // for the given address if user exists
    //
    // @param address _user 
    // address of the user for which UserDetail is 
    // to be searched
    //
    // @return (string, string, string, string)
    // array of strings containing values of 
    // UserDetail struct in the respective order
    function getUserDetail(address _user)  
    public 
    view
    returns(string, string, string, string) 
    {
        // find the user details
        User.UserDetail memory personal = dbContract.findUserDetail(_user);

        // return
        return (personal.fullName, personal.userName, personal.imgUrl, personal.email);
    }

    // @description 
    // returns UserSocial struct values
    // for the given address if user exists
    //
    // @param address _user 
    // address of the user for which UserSocial is 
    // to be searched
    //
    // @return (string, string, string, string)
    // array of strings containing values of 
    // UserSocial struct in the respective order
    function getUserSocial(address _user)  
    public 
    view
    returns(string, string, string, string, string, string, string) 
    {
        // find the user details
        User.UserSocial memory social = dbContract.findUserSocial(_user);

        // return
        return (social.twitterUrl, social.fbUrl, social.githubUrl, social.dribbbleUrl, 
            social.linkedInUrl, social.behanceUrl, social.mediumUrl);
    }

    // @description
    // finds the address the given userName
    //
    // @param string _userName
    // userName of the user who's address is to be searched
    //
    // @return address
    // address of the user with given userName
    function getAddrForUserName(string _userName)
    public
    view
    returns(address) 
    {
        return dbContract.findAddrForUserName(_userName);
    }
}