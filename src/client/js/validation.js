export const validateRegistrationData = (name, password, confirmPassword) => {
    const validationResult = [];

    if (name.length < 1) {
        validationResult.push('Имя должно быть заполнено.');
    }
    if (password.length < 1) {
        validationResult.push('Пароль должен быть указан.');
    }
    if (confirmPassword !== password) {
        validationResult.push('Пароль и его подтверждение должны совпадать.');
    }

    return validationResult;
};

export const getUserRegistrationValidationErrors = err => {
    const validationResult = ['Не удалось зарегистрировать нового пользователя'];

    if (err.response.status === 409) {
        const {name} = err.response.data;

        validationResult.push(`Пользователь '${name}' уже существует.`);
    }

    return validationResult;
};