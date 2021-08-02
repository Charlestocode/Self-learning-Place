// Given Conditions
// An array of factories.
const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
];

const employeeTypes = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
    {id: 1, name: "Alice", type: 2},
    {id: 2, name: "Bob", type: 3},
    {id: 3, name: "John", type: 2},
    {id: 4, name: "Karen", type: 1},
    {id: 5, name: "Miles", type: 3},
    {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id: 1, title: "task01", duration: 60 },
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

// ---------------------------------------------------------------------------------------------------------



// Answer Functions
// 1.
function numberOfEmployeesByFactory(factories) {
    let numberOfEmployeesByFactory = [];
    for (let fact in factories) {
        let numberOfEmployees = 0
        let factoryInfo = {};

        // Add the factory name.
        factoryInfo.name = factories[fact].name;
        // Count how many employees are in the factory.
        for ( ; numberOfEmployees < factories[fact].employees.length; ) {
            ++numberOfEmployees;
        }
        factoryInfo.count = numberOfEmployees;
        numberOfEmployeesByFactory[fact] = factoryInfo;
    }

    let text = "";
    for (let factoryInfo of numberOfEmployeesByFactory) {
        text = text + JSON.stringify(factoryInfo) + "<br>"; 
    }
    document.getElementById("answer1").innerHTML = text;
}


// 2.
function numberOfFactoryByEmployee(factories) {
    let employees = [];
    
    for (let factory of factories) {
        for (let employeeName of factory.employees) {
            // By brute force, find whether there is the same name in array `employees` 
            // and increase the count.
            let newMember = true;
            for (let employee of employees) {
                if (employeeName == employee.employee) {
                    newMember = false;
                    ++employee.count;
                    break;
                }
            }

            // If employeeName is a new member, push it into array `employees`.
            if (newMember == true) {
                let employee = {employee: employeeName, count: 1};
                employees.push(employee);
            }
        }
    }

    // Show info.
    let text = "";
    for (let employee of employees) {
        text = text + JSON.stringify(employee) + "<br>";
    }
    document.getElementById("answer2").innerHTML = text;
}


// 3.
function sortEmployeeByAlphabet(factories) {
    text = "";
    for (let factory of factories) {
        // Sort by the fisrt charactor of each string.
        factory.employees.sort();
        text = text + JSON.stringify(factory) + "<br>"; 
    }
    document.getElementById("answer3").innerHTML = text;
}


// 4.
// Suppose we calculate the tatal work hours of all employees,
// that is, summing up all employees' work hours.
function totalWorkHoursOfAllEmployeesPerDay(employees) {
    let workHours = 0;
    for (let employee of employees) {
        let [beginHour, endHour] = getBeginTimeAndEndTime(employee);
        workHours = workHours + (endHour - beginHour);
    }
    document.getElementById("answer4").innerHTML = "Total work hours per day: " + workHours + " hours per day";
    return workHours;
}


// 5.
function howManyEmployeesByTime(employees) {
    const dayTime = getDayTime();
    const inputHour = dayTime.slice(0, 2);
    const inputMinute = dayTime.slice(3, 5);
    const inputSecond = dayTime.slice(6, 8);
    
    // Calculate how many employees are working.
    let numberOfEmployeesWorking = 0;
    for (let employee of employees) {
        let [beginHour, endHour, beginMinute, endMinute, beginSecond, endSecond] = getBeginTimeAndEndTime(employee);


        // Case 1: When inputHour is between beginHour and endHour, it must be at work time.
        if (inputHour > beginHour && inputHour < endHour) {
            ++numberOfEmployeesWorking;

            // Case 2: When inputHour is equal to beginHour
        } else if(inputHour >= beginHour && inputHour < endHour) {
            // 2.a: and inputMinute is larger than beginMinute, it must be at work time.
            if (inputMinute > beginMinute) {
                ++numberOfEmployeesWorking;
                // 2.b: , inputMinute is equal to beginMinute ,and inputSecond is larger than 
                // beginSecond, it must be at work time.
            } else if (inputMinute == beginMinute && inputSecond >= beginSecond) {
                ++numberOfEmployeesWorking;
            }

            // Case 3: When inputHour is equal to endHour
        } else if (inputHour > beginHour && inputHour <= endHour) {
            // 3.a: and inputMinute is less than endMinute, it must be at work time.
            if (inputMinute < endMinute) {
                ++numberOfEmployeesWorking;
                // 3.b: , inputMinute is equal to beginMinute ,and inputSecond is less than 
                // endSecond, it must be at work time.
            } else if (inputMinute == endMinute && inputSecond <= endSecond) {
                ++numberOfEmployeesWorking;
            }

            // Case 4: When inputHour is equal to beginHour and endHour
        } else if (inputHour == beginHour && inputHour == endHour) {
            // 4.a: , and inputMinute is between eginMinute and endMinute, it must be at work time.
            if (inputMinute > beginMinute && inputMinute < endMinute) {
                ++numberOfEmployeesWorking;
                // 4.b: , and inputMinute is equal to beginMinute, plus inputSecond is larger than beginSecond,
                // it must be at work time.
            } else if (inputMinute >= beginMinute && inputMinute < beginMinute && inputSecond >= beginSecond) {
                ++numberOfEmployeesWorking;
                // 4.c: , and inputMinute is equal to endMinute, plus inputSecond is less than endSecond,
                // it must be at work time.
            } else if (inputMinute > beginMinute && inputMinute <= endMinute && inputSecond <= endSecond) {
                ++numberOfEmployeesWorking;
                // 4.d: , and inputMinute is equal to beginMinte and endMinute, plus inputSecond is 
                // between beginSecond and endSecond, it must be at work time.
            } else if (inputMinute == beginMinute && inputMinute == endMinute && 
                inputSecond >= beginSecond && inputSecond <= endSecond) {
                    ++numberOfEmployeesWorking;
                }
        }
    }

    document.getElementById("answer5").innerHTML = "Number of Employees Working: " + numberOfEmployeesWorking;
    return numberOfEmployeesWorking;
}


// 6.
function numberOfDaysToFinish(tasks) {
    // Find the total needed hours of the whole tasks.
    let totalHoursOfTasks = 0;
    for (let task of tasks) {
        totalHoursOfTasks = totalHoursOfTasks + task.duration / 60.0;
    }

    // Calculate how many days to finish the whole tasks.
    let numberOfDay = 0;
    while (totalHoursOfTasks > 0) {
        ++numberOfDay;
        totalHoursOfTasks = totalHoursOfTasks - totalWorkHoursOfAllEmployeesPerDay(employees);
    }

    document.getElementById("answer6").innerHTML = "Number of Days to Finish: " + numberOfDay + " days";
    return numberOfDay;
}



// -------------------------------------------------------------------------------------------------------
// Get day time.
function getDayTime() {
    // Set the input dayTime.
    let inputHour = String(document.getElementById("hour").value);
    let inputMinute = String(document.getElementById("minute").value);
    let inputSecond = String(document.getElementById("second").value);
    // Adjust the time value to the appropriate format.
    if (inputHour != "" && inputMinute != "" && inputSecond != "") {
        if (inputHour < 10) {inputHour = "0" + inputHour;}
        if (inputMinute < 10) {inputMinute = "0" + inputMinute;}
        if (inputSecond < 10) {inputSecond = "0" + inputSecond;}
        return inputHour + ":" + inputMinute + ":" + inputSecond;
    } else {
        return ;
    }
}


// Get the start hour, minute, second and the end hour, minute, second of the specific employee.
function getBeginTimeAndEndTime(employee) {
    // Get each employee's job type.
    let jobType = employee.type;
    let beginHour, endHour, beginMinute, endMinute, beginSecond, endSecond;

    // Find what kind of job the employee get.
    for (let employeeType of employeeTypes) {
        if (jobType == employeeType.id) {
            beginHour = Number(employeeType.work_begin.slice(0, 2));
            endHour = Number(employeeType.work_end.slice(0, 2));
            beginMinute = Number(employeeType.work_begin.slice(3, 5));
            endMinute = Number(employeeType.work_end.slice(3, 5));
            beginSecond = Number(employeeType.work_begin.slice(6, 8));
            endSecond = Number(employeeType.work_end.slice(6, 8));

            // Change the hour value into 24 when work_end's hour is 0.
            if (endHour == 0) {
                endHour = 24;
            }
            break;
        }
    }
    return [beginHour, endHour, beginMinute, endMinute, beginSecond, endSecond];
}