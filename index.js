/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (employeeRecord) =>{
    return {
        "firstName": employeeRecord[0],
        "familyName": employeeRecord[1],
        "title": employeeRecord[2],
        "payPerHour": employeeRecord[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

const createEmployeeRecords = (employeeArray) =>{
    return employeeArray.map((e)=>createEmployeeRecord(e))
    
}

// cannot use arrow function
const createTimeInEvent = function (dateStamp){
    
    let strDate = dateStamp.split(" ")
    
    let timeObj = {
        'type': 'TimeIn',
        'hour': parseInt(strDate[1]),
        'date': strDate[0]
    }

    this.timeInEvents.push(timeObj)
    return this
}

const createTimeOutEvent = function (dateStamp){
    let strDate = dateStamp.split(" ")
    
    let timeObj = {
        'type': 'TimeOut',
        'hour': parseInt(strDate[1]),
        'date': strDate[0]
    }

    this.timeOutEvents.push(timeObj)
    return this
}


const hoursWorkedOnDate = function(dateStamp){
    let InIndex = this.timeInEvents.findIndex(element => element.date === dateStamp)
    let OutIndex = this.timeOutEvents.findIndex(element => element.date === dateStamp)
    return (this.timeOutEvents[OutIndex].hour - this.timeInEvents[InIndex].hour)/ 100
}

const wagesEarnedOnDate = function(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName){
    let employee
    srcArray.forEach(element => {
        if(element.firstName === firstName)
        {
            employee = element
        }

    })
    return employee
}

const calculatePayroll = function(employeeRecord){
    let sum =0;
    employeeRecord.forEach(element => {
        sum = sum + allWagesFor.call(element)
    })
   return sum
}