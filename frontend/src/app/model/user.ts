import { Roles } from "./roles";

export class User {
    userId: number;
    username: string;
    password: string;
    name: string;
    email: string;
    enabled: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    roles: Roles[];
    
}
