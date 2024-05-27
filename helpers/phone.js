
/**
 * phoneValidation
 * @param {string} phone
 * @return {boolean}
 * */
export const phoneValidation = phone => phone?.length === 11;

/**
 * Удаление из номера лишний символов
 * @param {string} phone
 * @return {string}
 * */
export const phonePreparing = phone => phone && phone.replaceAll(/\D+/g, "")