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
        owner = msg.sender;
    } 

    // list mapping of all users
    mapping (address => User.UserMain) public users;

    // @description 
    // checks if the user with given address exists
    //
    // @param address _user 
    // address of the user to be looked up
    //
    // @return bool 
    // true if user exists else false
    function isExists (address _user) public view returns (bool) {
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
    function insertUserDetail (User.UserDetail _personal, address _user) public {
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
    function findUserDetail (address _user) view public returns (User.UserDetail){
        return users[_user].personal;
    }
}