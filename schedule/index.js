// scheduler module
const cron = require('node-cron');

// log cron jobs to text file
const fs = require('fs');
const util = require('util');
const logs = fs.createWriteStream(__dirname + '/cron.log', {
  flags: 'a'
});

// takes in a string formatted with date / time requirements
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

//  '0 8 * * *' is 8AM
//  '0 8-20/4 * * *' is 8AM-8PM every four hours
// '0 6,16 * * *' is 6AM, 4PM

module.exports = cron.schedule('0 0 9 * * *', () => {}, {
  scheduled: true,
  timezone: 'America/Los_Angeles'
});
