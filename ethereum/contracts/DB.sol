/** 
  * This contract specifically stores all the user
  * data to avoid inconsistencies during Blockvitae
  * contract update.
  *
  * This files acts as the DB layer between the
  * model User.sol and the controller Blockvitae.sol
  */

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

// imports
import "./User.sol";

contract DB {
    
    using User for User.UserMain;

    address public owner;

    constructor() public {
        owner = msg.sender;
    } 

    // list of all users
    mapping (address => User.UserMain) public users;

    function isExists (address _user) public view returns (bool) {
        require(_user != address(0));
        return users[_user].exists;
    }

    function insertUserDetail (User.UserDetail _personal, address _user) public {
        users[_user].personal = _personal;
        users[_user].exists = true;
        users[_user].owner = _user;
    }

    function findUserDetail (address _user) view public returns (User.UserDetail){
        return users[_user].personal;
    }
}