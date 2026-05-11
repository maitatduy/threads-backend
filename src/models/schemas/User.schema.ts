import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;

    name: string;
    username: string;
    email: string;
    phone: string;

    description?: string;
    link?: string;

    avatar_path?: string;

    password: string;

    created_at?: Date;
    updated_at?: Date;
}
