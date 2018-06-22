/**
 * Namespace covers interface for all the
 * Application errors
 */
export namespace BlockvitaeError {

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