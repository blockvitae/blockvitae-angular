pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

// @title User holds all structs
// for user details
library User {
    
    // UserDetail holds personal
    // details of the user
    struct UserDetail {
        string fullName; // fullname of the user
        string userName; // username or url selected by the user
        string imgUrl; // profile image url
        string email; // email address of the user
    }

    // UserSocial holds all the urls
    // for the social accounts of the user
    struct UserSocial {
        string twitterUrl; // twitter handle of user
        string fbUrl; // facebook handle of user
        string githubUrl; // github url
        string dribbbleUrl; // dribbble url
        string linkedInUrl; // linkedIn handle of user
        string behanceUrl; // behance Url of user
    }

    // UserWorkExp holds record of 
    // work experience for a particular location
    struct UserWorkExp {
        string company; // name of the company or organization
        string position; // position held in the company
        string dateStart; // start date 
        string dateEnd; // end date
        string description; // description of the job role
    }

    // UserEducation holds information
    // for all the user formal and informal
    // education
    struct UserEducation {
        string organization; // name of the school or organization
        string level; // level of qualification
        string dateStart; // start date
        string dateEnd; // end date 
        string description; // description of the qualification
    }

    // UserProjects holds records all
    // the professional and academic projects
    // that the user wants to showcase
    struct UserProject {
        string name; // name of the project
        string description; // description of the project
        string url; // url of the project
    }

    // User is struct which holds all
    // the details for a particular user
    // creating a CV on Blockvitae
    struct UserMain {
        UserDetail personal; // personal details of the user
        UserSocial social; // social details of the user
        UserWorkExp[] work; // work experience of the user
        UserEducation[] education; // education of the user
        UserProject[] projects; // projects of the user
        string[] skills; // skills of the user
        bool exists; // true everytime add new new struct
        address owner; // owner of the user profile
    }

    // @description: sets the values of UserDetail struct
    //
    // @param string fullName full name of the user
    // @param string userName username of the user
    // @param string imgUrl profile image url of the user
    // @param string email email of the user
    function setUserDetail (
        string _fullName,
        string _userName,
        string _imgUrl,
        string _email
    )
    internal
    pure
    returns (UserDetail)
    {
        UserDetail memory detail;
        detail.fullName = _fullName;
        detail.userName = _userName;
        detail.imgUrl = _imgUrl;
        detail.email = _email;
        return detail;
    }
}