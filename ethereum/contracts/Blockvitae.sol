pragma solidity ^0.4.24;

// @title Blockchain based CV
contract Blockvitae {
    
    // UserDetails holds personal
    // details of the user
    struct UserDetails {
        string fullName; // fullname of the user
        string userName; // username or url selected by the user
        string imgUrl; // profile image url
        string email; // email address of the user
    }

    struct User

    // User is struct which holds all
    // the details for a particular user
    // creating a CV on Blockvitae
    struct User {
        UserDetails personal; // personal details of the user
    }
}