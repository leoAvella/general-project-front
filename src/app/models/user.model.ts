export class UserModel {
    id?: number;
    name: string = '';
    email: string = '';
    email_verified_at?: string;
    image: string = '';
    password?: string;
    remember_token?: string;
    created_at?: string;
    updated_at?: string;
    status?: boolean;
}