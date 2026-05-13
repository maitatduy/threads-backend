export interface RegisterReqBody {
    name: string;
    username: string;
    email: string;
    phone: string;

    description?: string;
    link?: string;

    avatar_path?: string;

    password: string;
    password_confirmation: string;
}
