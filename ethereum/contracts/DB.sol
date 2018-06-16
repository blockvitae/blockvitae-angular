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

    // constructor function
    constructor() public {
        // initially make this contract its own owner
        // This will be invalid once Blockvitae gets deployed
        // as it will become the owner of this contract
        owner = address(this);
    } 

    // list mapping of all users
    mapping(address => User.UserMain) internal users;

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
        users[_user].personal = _personal;
        persistUser(_user);
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
    // creates the existance of the user
    // 
    // @param address _user
    // address of the user
    function persistUser(address _user) private {
        users[_user].exists = true;
        users[_user].owner = _user;
    }
}