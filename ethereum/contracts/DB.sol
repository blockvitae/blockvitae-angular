/** 
  * This contract specifically stores all the user
  * data to avoid inconsistencies during Blockvitae
  * contract update.
  *
  * This files acts as the DB layer between the
  * model User.sol and the controller Blockvitae.sol
  */

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2; // experimental

// imports
import "./User.sol";

contract DB {
    
    using User for User.UserMain;

    // address of the owner of the contract
    address public owner;

    // total registered users
    uint public totalUsers;

    // constructor function
    constructor() public {
        // initially make this contract its own owner
        // This will be invalid once Blockvitae gets deployed
        // as it will become the owner of this contract
        owner = address(this);
        totalUsers = 0;
    } 

    // list mapping of all users
    mapping(address => User.UserMain) internal users;

    // list mapping of all userNames
    mapping(string => address) internal userNames;

    // check for the owner
    // owner == address(this) will get
    // invalid after Blockvitae becomes owner of
    // this contract
    modifier isOwner() {
        require(owner == msg.sender || owner == address(this));
        _;
    }

    // @description
    // updates the current owner
    //
    // @param address _blockvitae
    // address of the Blockvitae contract
    function setOwner(address _blockvitae) public isOwner{
        owner = _blockvitae;
    }

    // @description 
    // checks if the user with given address exists
    //
    // @param address _user 
    // address of the user to be looked up
    //
    // @return bool 
    // true if user exists else false
    function isExists(address _user) public view isOwner returns(bool) {
        require(_user != address(0));
        return users[_user].exists;
    }

    // @description
    // inserts or updates a new UserDetail in the database mapping
    //
    // @param User.UserDetail _personal
    // UserDetail struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserDetail(User.UserDetail _personal, address _user) public isOwner {
        // if new requested userName is available
        if (userNames[_personal.userName] == address(0x0)) { 
            // if user exists
             // and user's old userName is not equal to the new one
             // string comparison not allowed. Therefore, compare hashes.
            if (users[_user].exists
                && keccak256(abi.encodePacked(users[_user].personal.userName)) 
                                != keccak256(abi.encodePacked(_personal.userName))) {
                // temp save oldUserName
                string memory oldUserName = users[_user].personal.userName;

                // update personal details
                users[_user].personal = _personal;

                // update userName
                userNames[oldUserName] = address(0x0);

                // assign new userName
                userNames[_personal.userName] = _user;
            }
            // user doesn't exist and requested userName is available
            else if (!users[_user].exists) {
                 // update personal details
                users[_user].personal = _personal;

                // assign new userName
                userNames[_personal.userName] = _user;

                // update new user count
                totalUsers++;
            }  

            persistUser(_user); 
        }
        // user exits but hasn't requested for a new userName
        else {
            // existing userName is same as the one sent in the request
            if (keccak256(abi.encodePacked(users[_user].personal.userName))
                    == keccak256(abi.encodePacked(_personal.userName))) {
                // update personal details
                users[_user].personal = _personal;

                // assign new userName
                userNames[_personal.userName] = _user;
            }

            persistUser(_user);
        }
    }

    // @description
    // inserts or updates a new UserSocial in the database mapping
    //
    // @param User.UserSocial _social
    // UserSocial struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserSocial(User.UserSocial _social, address _user) public isOwner {
        users[_user].social = _social;
        persistUser(_user);
    }

    // @description
    // inserts or updates a new UserProject in the database mapping
    // 
    // @param User.UserProject
    // UserProject struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserProject(User.UserProject _project, address _user) public isOwner {
        users[_user].projects.push(_project);
        persistUser(_user);
    }

    // @description
    // inserts or update a new UserWorkExp in the database mapping
    //
    // @param User.UserWorkExp _workExp
    // UserWorkExp struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserWorkExp(User.UserWorkExp _workExp, address _user) public isOwner {
        users[_user].work.push(_workExp);
        persistUser(_user);
    }

    // @description
    // inserts or updates a new UserSkill in the database
    //
    // @param User.UserSkill _skills
    // UserSkill struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserSkill(User.UserSkill _skills, address _user) public isOwner {
        users[_user].skills = _skills;
        persistUser(_user);
    }

    // @description
    // inserts or updates a new UserEducation in the database
    //
    // @param User.UserEducation _education
    // UserEducation struct for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserEducation(User.UserEducation _education, address _user) public isOwner {
        users[_user].education.push(_education);
        persistUser(_user);
    }

    // @description
    // finds the UserEducation struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserEducation[]
    // UserEducation struct array of the user with given address
    function findUserEducation(address _user) view public isOwner returns(User.UserEducation[]){
        return users[_user].education;
    }

    // @description
    // finds the UserSkill struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserSkill
    // UserSkill struct of the user with given address
    function findUserSkill(address _user) view public isOwner returns(User.UserSkill) {
        return users[_user].skills;
    }

    // @description
    // finds the UserProject struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserProject[]
    // UserProject struct array of the user with given address
    function findUserProject(address _user) view public isOwner returns(User.UserProject[]) {
        return users[_user].projects;
    }

    // @description
    // finds the UserDetail struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserDetail
    // UserDetail struct of the user with given address
    function findUserDetail(address _user) view public isOwner returns(User.UserDetail) {
        return users[_user].personal;
    }

    // @description
    // finds the UserSocial struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserSocial
    // UserSocial struct of the user with given address
    function findUserSocial(address _user) view public isOwner returns(User.UserSocial) {
        return users[_user].social;
    }

    // @description
    // finds the UserWorkExp struct values for the given user
    //
    // @param address _user
    // address of the address of the user who's data is to be searched
    //
    // @return User.UserWorkExp
    // UserWorkExp struct of the user with given address
    function findUserWorkExp(address _user) view public isOwner returns(User.UserWorkExp[]) {
        return users[_user].work;
    }

    // @description
    // finds the address the given userName
    //
    // @param string _userName
    // userName of the user who's address is to be searched
    //
    // @return address
    // address of the user with given userName
    function findAddrForUserName(string _userName) view public isOwner returns(address) {
        require(users[userNames[_userName]].exists);
        return userNames[_userName];
    }

    // @description
    // creates the existance of the user
    // 
    // @param address _user
    // address of the user
    function persistUser(address _user) private {
        users[_user].exists = true;
        users[_user].owner = _user;
    }
}