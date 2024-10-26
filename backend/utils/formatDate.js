const to2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date) => {
    return (
        [
            date.getFullYear(),
            to2Digits(date.getMonth() + 1),
            to2Digits(date.getDate()),
        ].join('.') + ' ' +
        [
            to2Digits(date.getHours()),
            to2Digits(date.getMinutes()),
            to2Digits(date.getSeconds())
        ].join(':')
    );
}