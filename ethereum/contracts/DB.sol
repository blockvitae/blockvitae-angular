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
    mapping(address => User.UserMain) users;

    // check for the owner
    // owner == address(this) will get
    // invalid after Blockviate becomes owner of
    // this contract
    modifier isOwner() {
        require(owner == msg.sender || owner == address(this));
        _;
    }

    // @description
    // updates the current owner
    //
    // @param address _blockvitae
    // address of the Blockviate contract
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
    // inserts or updates the new UserDetail in the database mapping
    //
    // @param User.UserDetail _personal
    // UserDetail object for the user
    //
    // @param address _user
    // address of the user who's details are to be inserted or updated
    function insertUserDetail(User.UserDetail _personal, address _user) public isOwner {
        users[_user].personal = _personal;
        users[_user].exists = true;
        users[_user].owner = _user;
    }

    // @description
    // finds the UserDetail struct values for the given user
    //
    // @param address _user
    // address of the user who's data is to be searched
    //
    // @return User.UserDetail
    // UserDetail struct of the user with given address
    function findUserDetail(address _user) view public isOwner returns(User.UserDetail){
        return users[_user].personal;
    }
}