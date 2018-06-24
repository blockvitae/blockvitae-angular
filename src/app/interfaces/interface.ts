/**
 * Namespace that covers the interfaces of
 * a Blockvitae user
 */
export namespace Blockvitae {
    /**
     * Holds all the details for a 
     * particular user
     */
    export interface User {
        personal: UserDetail; 
        social: UserSocial;
        work: Array<UserWorkExp>;
        education: Array<UserEducation>;
        projects: Array<UserProject>;
        skills: Array<string>;
        address: string;
    }

    /**
     * Holds personal details of the 
     * user
     */
    export interface UserDetail {
        fullName: string; // fullName of the user
        userName: string; // userName of the user
        imgUrl?: string; // profile img url
        email: string;  // email address of the user
    }

    /**
     * Holds all the urls for social media
     * accounts of the user
     */
    export interface UserSocial {
        twitterUrl?: string; // twitter handle of user
        fbUrl?: string; // facebook handle of user
        githubUrl?: string; // github url
        dribbbleUrl?: string; // Dribbble url
        linkedUrl?: string; // LinkedIn Url
        behanceUrl?: string; // behance url 
        mediumUrl?: string; // medium url
    }

    /**
     * Holds record of work experience for a particular
     * company
     */
    export interface UserWorkExp {
        company: string; // name of the company
        position?: string; // position held in the company
        dateStart?: string; // start date
        dateEnd?: string; // end date
        description?: string; // description of the job role
    }

    /**
     * Holds information for all
     * the user's formal & informal
     * education
     */
    export interface UserEducation {
        organization: string; // name of the school
        level?: string; // level of qualification
        dateStart?: string; // start date
        dateEnd?: string; // end date
        description?: string; // description of the qualification
    }

    /**
     * Holds all the professional and academic 
     * projects
     */
    export interface UserProject {
        name: string; // name of the project
        description?: string; // description of the project
        url?: string; // url of the project
    }

    /**
     * Errors related to metamask
     * 
     * errorCode: "DAPP_01"
     * errorMsg: "DaPP_Browser_Not_Found"
     * errorDescription: "Please install Metamask"
     * 
     * errorCode: "DAPP_02"
     * errorMsg: "Ropsten_Network_Not_Found"
     * errorDescription: "Please select Ropsten Network"
     */
    export interface MetamaskError {
        errorCode: string,
        errorMsg: string,
        errorDescription: string 
    }
}