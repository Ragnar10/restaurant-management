export const transformDateAfterForm = (date) => {
    return date.split('-').reverse().join('.');
};

export const transformDateBeforeForm = (date) => {
    return date.split('.').reverse().join('-');
};