const moment = require('moment');

// Format date to 'D MMMM YYYY' || '1 January 2021'
const formatDateText = (date) => {
    return moment(date).format('D MMMM YYYY')
}

// Format date from UTC to UTC+7 Jakarta
const convertDateJKT = (date) => {
    return moment(date).utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss')
} // hasilnya 2021-01-01 00:00:00

module.exports = {
    formatDateText,
    convertDateJKT
};