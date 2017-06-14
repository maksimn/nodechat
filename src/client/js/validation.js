export const validateRegistrationData = (name, password, confirmPassword) => {
    const validationErrorData = [];

    if (name.length < 1) {
        validationErrorData.push('Имя должно быть заполнено.');
    }
    if (password.length < 1) {
        validationErrorData.push('Пароль должен быть указан.');
    }
    if (confirmPassword !== password) {
        validationErrorData.push('Пароль и его подтверждение должны совпадать.');
    }

    return validationErrorData;
};

