pragma solidity ^0.4.24;

// import user.sol contract
import "./User.sol";

// @title Blockvitae for CV
contract Blockvitae {

    using User for User.UserMain;

    // list of all users
    mapping (address => User.UserMain) users;

    // owner of the contract
    address public owner;

    // checks if the user has an account or not
    modifier userExists () {
        require(users[msg.sender].exists);
        _;
    }

    // sets the owner of the contract
    constructor () public {
        owner = msg.sender;
    } 

    // @description: creates UserDetail struct
    //
    // @param string fullName full name of the user
    // @param string userName username of the user
    // @param string imgUrl profile image url of the user
    // @param string email email of the user
    function createUserDetail (
        string fullName,
        string userName,
        string imgUrl,
        string email
    )
    public
    {
        // create userDetail section
        users[msg.sender].personal = User.setUserDetail(
            fullName,
            userName,
            imgUrl,
            email
        );

        // set the user exists to true
        users[msg.sender].exists = true;
    }
}