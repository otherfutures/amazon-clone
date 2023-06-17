// Calc. the future shipping delivery date
const calculateFutureDate = (baseDate, daysToAdd) => {
    const futureDate = new Date(baseDate);
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    adjustFutureDate(futureDate);
    return futureDate;
};

// Check if it's Sunday or Saturday and set the future date to Monday
const adjustFutureDate = (date) => {
    if (date.getDay() === 0) {
        date.setDate(date.getDate() + 1);
    } else if (date.getDay() === 6) {
        date.setDate(date.getDate() + 2)
    }
};

// +2, +4, & +10 from today for shipping delivery dates
const currentDate = new Date(); // Today's date
const priorityDate = calculateFutureDate(currentDate, 2); // +2 from today
const regularDate = calculateFutureDate(priorityDate, 2); // +2 from priority shipping
const freeDate = calculateFutureDate(regularDate, 6); // +6 from regular shipping

// Date formatting (e.g. Thursday, June 2)
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const formattedPriorityDate = priorityDate.toLocaleDateString('en-US', options);
const formattedRegularDate = regularDate.toLocaleDateString('en-US', options);
const formattedFreeDate = freeDate.toLocaleDateString('en-US', options);

console.log(formattedPriorityDate);
console.log(formattedRegularDate);
console.log(formattedFreeDate); 
