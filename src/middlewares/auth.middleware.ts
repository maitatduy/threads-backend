import { checkSchema } from "express-validator";
import databaseService from "@/services/database.service";

export const registerValidator = checkSchema({
    name: {
        trim: true,

        notEmpty: {
            errorMessage: "Họ và tên không được để trống!",
        },

        isLength: {
            options: {
                min: 2,
                max: 100,
            },
            errorMessage: "Họ và tên phải từ 2 đến 100 ký tự!",
        },
    },

    username: {
        trim: true,

        notEmpty: {
            errorMessage: "Tên người dùng không được để trống!",
        },

        isLength: {
            options: {
                min: 4,
                max: 20,
            },
            errorMessage: "Tên người dùng phải từ 4 đến 20 ký tự!",
        },

        matches: {
            options: /^[a-zA-Z0-9_]+$/,
            errorMessage: "Tên người dùng chỉ chứa chữ cái, chữ số và dấu gạch dưới!",
        },

        custom: {
            options: async (value) => {
                const user = await databaseService.users.findOne({
                    username: value,
                });

                if (user) {
                    throw new Error("Tên người dùng đã tồn tại!");
                }

                return true;
            },
        },
    },

    email: {
        trim: true,

        notEmpty: {
            errorMessage: "Email không được để trống!",
        },

        isEmail: {
            errorMessage: "Email không hợp lệ!",
        },

        normalizeEmail: true,
    },

    phone: {
        trim: true,

        notEmpty: {
            errorMessage: "Số điện thoại không được để trống!",
        },

        isMobilePhone: {
            options: ["vi-VN"],
            errorMessage: "Số điện thoại không hợp lệ!",
        },
    },

    password: {
        notEmpty: {
            errorMessage: "Mật khẩu không được để trống!",
        },

        isLength: {
            options: {
                min: 6,
                max: 50,
            },
            errorMessage: "Mật khẩu có khoảng từ 6 đến 50 ký tự!",
        },

        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            errorMessage: "Mật khẩu chỉ chứa chữ cái viết hoa, viết thường và chữ số!",
        },
    },

    password_confirmation: {
        notEmpty: {
            errorMessage: "Xác nhận mật khẩu không được để trống!",
        },

        isLength: {
            options: {
                min: 6,
                max: 50,
            },
            errorMessage: "Xác nhận mật khẩu có khoảng từ 6 đến 50 ký tự!",
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Xác nhận mật khẩu không trùng với mật khẩu!");
                }

                return true;
            },
        },
    },
});
