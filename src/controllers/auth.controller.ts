import { Request, Response } from "express";
import authService from "@/services/auth.service";

export const registerController = async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    return res.status(201).json({
        status: "success",
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        token_type: "bearer",
    });
};
