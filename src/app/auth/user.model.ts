export class User {
    public name: string;
    public email: string;
    public uid: string;

    constructor(user: UserDto) {
        this.name = user && user.name || null;
        this.uid = user && user.uid || null;
        this.email = user && user.email || null;
    }
}

export interface UserDto {
    uid: string;
    email: string;
    name: string;
}
