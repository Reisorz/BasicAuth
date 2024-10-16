import { Roles } from "./roles";

export class User {
    userId: number;
    username: string;
    isEnabled: boolean;
    accountNoExpired: boolean;
    accountNoLocked: boolean;
    credentialNoExpired: boolean;
    roles: Roles[];
    
}
