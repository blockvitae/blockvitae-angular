/**
 * This library file acts as model which provides
 * attributes for the user and the functions to 
 * perform operations on the given data
 */
pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2; // experimental

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
        string mediumUrl; // medium url of user
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

    // Skills of the user
    struct UserSkill {
        bytes32[] skills; // skills of the user
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
        UserSkill skills; // skills of the user
        bool exists; // true everytime add new new struct
        address owner; // owner of the user profile
    }

    // @description 
    // sets the values of UserDetail struct
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
    //
    // @return UserDetail
    // UserDetail struct for the given values
    function setUserDetail(
        string _fullName,
        string _userName,
        string _imgUrl,
        string _email
    )
    internal
    pure
    returns(UserDetail)
    {
        UserDetail memory detail;
        detail.fullName = _fullName;
        detail.userName = _userName;
        detail.imgUrl = _imgUrl;
        detail.email = _email;
        return detail;
    }

    // @description
    // sets the values of UserSocial struct
    //
    // @param string _twitterUrl
    // twitter url of the user
    //
    // @param string _fbUrl
    // facebook url of the user
    //
    // @param string _githubUrl
    // github url of the user
    //
    // @param string _linkedInUrl
    // linked in url of the user
    //
    // @param string _behanceUrl
    // behance url of the user
    //
    // @param string _mediumUrl
    // medium url of the user
    //
    // @return UserSocial
    // UserSocial struct for the given values
    function setUserSocial(
        string _twitterUrl,
        string _fbUrl,
        string _githubUrl,
        string _dribbbleUrl,
        string _linkedInUrl,
        string _behanceUrl,
        string _mediumUrl
    ) 
    internal
    pure
    returns(UserSocial)
    {
        UserSocial memory social;
        social.twitterUrl = bytes(_twitterUrl).length != 0 ? _twitterUrl : "";
        social.fbUrl = bytes(_fbUrl).length != 0 ? _fbUrl : "";
        social.githubUrl = bytes(_githubUrl).length != 0 ? _githubUrl : "";
        social.dribbbleUrl = bytes(_dribbbleUrl).length != 0 ? _dribbbleUrl : "";
        social.linkedInUrl = bytes(_linkedInUrl).length != 0 ? _linkedInUrl : "";
        social.behanceUrl = bytes(_behanceUrl).length != 0 ? _behanceUrl : "";
        social.mediumUrl = bytes(_mediumUrl).length != 0 ? _mediumUrl : "";
        return social;
    }

    // @description
    // sets the values of UserProject struct
    //
    // @param string _name
    // name of the project
    //
    // @param string _description
    // description of the project
    //
    // @param string _url
    // url of the project
    //
    // @return UserProject
    // UserProject struct for the given values
    function setUserProject(
        string _name,
        string _description,
        string _url
    )
    internal
    pure
    returns(UserProject)
    {
        require(bytes(_name).length > 0);
        UserProject memory project;
        project.description = bytes(_description).length != 0 ? _description : "";
        project.name = bytes(_name).length != 0 ? _name : "";
        project.url = bytes(_url).length != 0 ? _url : "";
        return project;
    }

    // @description
    // sets the values of UserWorkExp struct
    //
    // @param string _company
    // name of the company or organization
    //
    // @param string _position
    // position held in the given company
    //
    // @param string _dateStart
    // start date of the job
    //
    // @param string _dateEnd
    // end date of the job
    //
    // @param string _description
    // description of the work experience
    //
    // @return UserWorkExp
    // UserWorkExp struct for the given values
    function setUserWorkExp(
        string _company,
        string _position,
        string _dateStart,
        string _dateEnd,
        string _description
    )
    internal
    pure
    returns(UserWorkExp)
    {
        require(bytes(_company).length > 0);
        UserWorkExp memory workExp;
        workExp.company = bytes(_company).length != 0 ? _company : "";
        workExp.position = bytes(_position).length != 0 ? _position : "";
        workExp.dateStart = bytes(_dateStart).length != 0 ? _dateStart : "";
        workExp.dateEnd = bytes(_dateEnd).length != 0 ? _dateEnd : "";
        workExp.description = bytes(_description).length != 0 ? _description : "";
        return workExp;
    }

    // @description
    // sets the values of UserEducation struct
    //
    // @param string _organization
    // name of the organization
    
    // @param string _level
    // education level held in the given organization
    
    // @param string _dateStart
    // start date of the education
    
    // @param string _dateEnd
    // end date of the education
    
    // @param string _description
    // description of the education
    
    // @return UserEducation
    // UserEducation struct for the given values
    function setUserEducation(
        string _organization,
        string _level,
        string _dateStart,
        string _dateEnd,
        string _description
    )
    internal
    pure
    returns(UserEducation)
    {
        require(bytes(_organization).length > 0);
        UserEducation memory education;
        education.organization = bytes(_organization).length != 0 ? _organization : "";
        education.level = bytes(_level).length != 0 ? _level : "";
        education.dateStart = bytes(_dateStart).length != 0 ? _dateStart : "";
        education.dateEnd = bytes(_dateEnd).length != 0 ? _dateEnd : "";
        education.description = bytes(_description).length != 0 ? _description : "";
        return education;
    }

    // @description
    // sets the values of UserSkill struct
    //
    // @param bytes32[] _skills
    // a byte32 array of skills
    // 
    // @return UserSkill
    // a UserSkill struct with given skills
    function setUserSkill(bytes32[] _skills) internal pure returns(UserSkill) {
        UserSkill memory uSkill;
        uSkill.skills = _skills;
        return uSkill;
    }
}