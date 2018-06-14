pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

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
    modifier userExists () {
        require (dbContract.isExists(msg.sender));
        _;
    }

    // checks if the address is not zero
    modifier addressNotZero() {
        require (msg.sender != address(0));
        _;
    }

    // sets the owner of the contract
    constructor (DB _dbContract) public {
        dbContract = _dbContract;
        owner = msg.sender;
    } 

    // @description: creates UserDetail struct
    //
    // @param string fullName full name of the user
    // @param string userName username of the user
    // @param string imgUrl profile image url of the user
    // @param string email email of the user
    function createUserDetail (
        string _fullName,
        string _userName,
        string _imgUrl,
        string _email
    )
    public
    addressNotZero
    {
        // create userDetail object
        User.UserDetail memory personal = User.setUserDetail(
            _fullName,
            _userName,
            _imgUrl,
            _email
        );

        // insert into the database
        dbContract.insertUserDetail(personal, msg.sender);
    }

    function getUserDetail (address _user)  
    public 
    view
    userExists
    returns (string, string, string, string) 
    {
        User.UserDetail memory personal = dbContract.findUserDetail(_user);
        return (personal.fullName, personal.userName, personal.imgUrl, personal.email);
    }
}