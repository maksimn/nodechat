export const validateRegistrationData = (name, password, confirmPassword) => {
    const validationErrorData = {
        errors: [],
        source: 'registration'
    };

    if (name.length < 1) {
        validationErrorData.errors.push('Имя должно быть заполнено.');
    }
    if (password.length < 1) {
        validationErrorData.errors.push('Пароль должен быть указан.');
    }
    if (confirmPassword !== password) {
        validationErrorData.errors.push('Пароль и его подтверждение должны совпадать.');
    }

    return validationErrorData;
};

