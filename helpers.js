const time_func = (para) => {
  console.log('inside function',para)
  time = para
  hour_index = time.indexOf('h')
  min_index = time.indexOf('m')
  
  hour = time.slice(0,hour_index) // get hour
  min = time.slice(hour_index+2, min_index) // get min
  
  if ((hour % 1 === 0) & (min % 1 === 0) & (hour > 0) & (min >=0 & min <=59)){
      return `${hour}h ${min}min`
      
  }else if ((hour % 1 === 0) & (min % 1 === 0) & (hour > 0) & (min == 60)){
          hour = parseInt(hour) + 1;
          return `${hour}h`
      }
  else{
      return false
  }
}

module.exports = time_func;