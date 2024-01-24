class User{
    id;
    role;
    mail;
    password;

    constructor(id, role, mail, password){
        this.id =id;
        this.role = role;
        this.mail = mail;
        this.password = password;
    }
};

module.exports = User;