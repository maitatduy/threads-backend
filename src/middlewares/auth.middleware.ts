import { checkSchema } from "express-validator";

export const registerValidator = checkSchema({
    name: {
        notEmpty: {
            errorMessage: "Họ và tên không được để trống!",
        },
    },

    username: {
        notEmpty: {
            errorMessage: "Tên người dùng không được để trống!",
        },
    },

    email: {
        isEmail: {
            errorMessage: "Email không hợp lệ!",
        },
    },

    phone: {
        notEmpty: {
            errorMessage: "Số điện thoại không được để trống!",
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
