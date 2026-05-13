import { LoginReqBody, RegisterReqBody } from "@/models/requests/Auth.request";
import { LoginResponse, RegisterResponse } from "@/models/responses/Auth.response";
import User from "@/models/database/User";
import databaseService from "@/services/database.service";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "@/utils/jwt";

class AuthService {
    async register(payload: RegisterReqBody): Promise<RegisterResponse> {
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const result = await databaseService.users.insertOne(
            new User({
                ...payload,
                password: hashedPassword,
            }),
        );

        const user_id = result.insertedId.toString();

        const tokenPayload = {
            user_id,
            username: payload.username,
            email: payload.email,
        };

        const access_token = signAccessToken(tokenPayload);
        const refresh_token = signRefreshToken(tokenPayload);

        return {
            access_token,
            refresh_token,
            token_type: "Bearer",
        };
    }

    async login(payload: LoginReqBody): Promise<LoginResponse> {
        const user = await databaseService.users.findOne({
            username: payload.username,
        });

        const tokenPayload = {
            user_id: user!._id?.toString(),
            username: user!.username,
            email: user!.email,
        };

        const access_token = signAccessToken(tokenPayload);
        const refresh_token = signRefreshToken(tokenPayload);

        return {
            access_token,
            refresh_token,
            token_type: "Bearer",
        };
    }
}

const authService = new AuthService();

export default authService;
