import { RegisterReqBody } from "@/models/requests/Auth.request";
import databaseService from "@/services/database.service";
import User from "@/models/database/User";

class AuthService {
    async register(payload: RegisterReqBody) {
        const result = await databaseService.users.insertOne(
            new User({
                ...payload,
            }),
        );
        return {
            access_token: "access_token",
            refresh_token: "refresh_token",
        };
    }
}

const authService = new AuthService();

export default authService;
