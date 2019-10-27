export default class stepsDb {

    constructor() {
        this.db = {};
        this.db.login = {   // added to be able to update without scanning first, if you dont want this let me know
            userSelector: "SELECTOR UNDEF",
            passSelector: "SELECTOR UNDEF",
            submitSelector: "SELECTOR UNDEF",
        }
    }

    addSiteLoad(step) {
        this.db["siteLoad"] = step;
    }

    addLogin(step) {
        this.db["login"] = step;
    }

    updateUser(user) {
        this.db.login.userSelector = user;
    }

    updatePass(pass) {
        this.db.login.passSelector = pass;
    }

    updateSubmit(submit) {
        this.db.login.submitSelector = submit;
    }

    getData() {
        return this.db;
    }

    loginDataExists() { //maybe change to flag
        return this.db.login;
    }
}