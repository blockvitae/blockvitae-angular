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
    function getUserDetail (address _user)  
    public 
    view
    userExists
    returns (string, string, string, string) 
    {
        // find the user details
        User.UserDetail memory personal = dbContract.findUserDetail(_user);

        // return
        return (personal.fullName, personal.userName, personal.imgUrl, personal.email);
    }
}