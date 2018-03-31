const daysInMonth = {
  1: 31,
  2: 28,
  3: 30,
  4: 30,
  5: 31,
  6: 29,
  7: 31,
  8: 31,
  9: 28,
  10: 31,
  11: 30,
  12: 31
}

const getLastDayOfPreviousMonth = (month) => {
  return daysInMonth[month]
}

// 2017/08/02 10:59:00    TO_TIMESTAMP(datetime, 'YYYY/MM/DD HH24:MI:SS')
const makeDatetimeString = (dateString) => {
  let date
  if (dateString) {
    date = new Date(dateString)
  } else {
    date = new Date()
  }
  let year = date.getYear()
  year += 1900
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (month < 10) { month = ('0' + month) }
  if (day < 10) { day = ('0' + day) }
  if (hour < 10) { hour = ('0' + hour) }
  if (minute < 10) { minute = ('0' + minute) }
  if (second < 10) { second = ('0' + second) }

  let timeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`
  
  if (minute >= 1) {
    minute -= 1
    if (minute < 10) { minute = ('0' + minute) }
    const newTimeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`
    
    return {timeNow: timeStamp, time1MinAgo: newTimeStamp}
  } 
  
  minute = 60 - (5 - minute)
  
  if (hour >= 1) {
    hour -= 1
    if (hour < 10) { hour = ('0' + hour) }
    const newTimeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`

    return {timeNow: timeStamp, time1MinAgo: newTimeStamp}
  }
   
  hour = 23
  
  if (day > 1) {
    day -= 1
    if (day < 10) { day = ('0' + day) }
    const newTimeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`

    return {timeNow: timeStamp, time1MinAgo: newTimeStamp}
  }
  
  if (month > 1) {
    day = getLastDayOfPreviousMonth(month - 1)
    month -= 1
    if (month < 10) { month = ('0' + month) }
    const newTimeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`

    return {timeNow: timeStamp, time1MinAgo: newTimeStamp}
  }
  
  day = getLastDayOfPreviousMonth(12)
  month = 12
  year -= 1
    
  const newTimeStamp = `${year}/${month}/${day} ${hour}:${minute}:${second}`
  return {timeNow: timeStamp, time1MinAgo: newTimeStamp}
}

module.exports = {
  makeDatetimeString
}