class User {
    name: string;
    email: string;
    password: string;

    constructor() {
        
    }

    findAll() {
        return [{ user: "fake"}];
    }
}

export {
    User
}