const moment = require('moment');

// Format date to 'D MMMM YYYY' || '1 January 2021'
const formatDateText = (date) => {
    return moment(date).format('D MMMM YYYY')
}

module.exports = {
    formatDateText
};