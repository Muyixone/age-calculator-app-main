const form = document.getElementById('form-details');
const divInput = document.getElementById('pair-input');
const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const inputs = document.getElementsByTagName('input');
const yearErrMessage = document.getElementById('err-msg-year');
const monthErrMessage = document.getElementById('err-msg-month');
const dayErrMessage = document.getElementById('err-msg-day');
const yearAgeMssg = document.getElementById('years-output');
const monthAgeMssg = document.getElementById('months-output');
const dayAgeMssg = document.getElementById('days-output');

const todaysDate = new Date();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  if (day.trim() === '' && month.trim() === '' && year.trim() === '') {
    const errMsg = document.querySelectorAll('small');
    for (let input of errMsg) {
      input.innerHTML = 'This field is required';
    }
    AddInputErrorClass();
    return false;
  }

  const dateString = `${year}-${month}-${day}`;

  // Check if values inputed is valid in line with regex pattern defined
  let regex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateString.match(regex) === null) {
    return console.log('date does not match regex');
  }

  validateDate(dateString);
  // return [
  //   dateIsValid(dateString),
  //   disableFutureDateInputs(dateString),
  //   calculateAge(dateString),
  // ];
});

/*
 * display input error message
 */
// function showMessage(message, type) {
//   //get the small element and set the message
//   const msg = document.querySelectorAll('small');
//   msg.innerText = message;
//   // update the class for the input
//   msg.className = type ? 'success' : 'error';
//   console.log(type);
// }

// function AddInputErrorClass(input, message) {
//   return showMessage(input, message, false);
// }
// function clearInputError(input) {
//   return showMessage(input, '', true);
// }

/*
 * validate input values
 */

function validateDate(input) {
  const date = new Date(input);

  const timestamp = date.getTime();
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    AddInputErrorClass();
    return false;
  }
  return date.toISOString().startsWith(input);
}

function AddInputErrorClass() {
  for (const i of inputs) {
    i.classList.add('error');
  }
}
// function dateIsValid(dateString) {
//   // Create a new Date object with the inputed values(dateString) passed as a parameter
//   // Check if time stamp is valid
//   // An invalid timestamp will return NaN
//   // Check if the input passed is a valid date string by passing it
//   // Into the date.toISOString function which returns either a true or false value

//   const date = new Date(dateString);
//   const timeStamp = date.getTime();
//   /////////////////////////////////////////////////////////
//   /* BUGS TO WORK ON
//    * Figure out how to remove the 'Must be a valid day' and replace with 'Must be a valid date, when only the day input is invalid
//    * The AddInputErrorClass function does not trigger when date is invalid
//    *
//    */
//   ////////////////////////////////////////////////////////

//   if (typeof timeStamp !== 'number' || Number.isNaN(timeStamp)) {
//     dayErrMessage.innerHTML = `Must be a valid day`;
//     monthErrMessage.innerHTML = `Must be a valid month`;
//     return AddInputErrorClass();
//   }

//   monthErrMessage.innerHTML = '';
//   dayErrMessage.innerHTML = '';
//   clearInputError();

//   // return dateString;
//   return date.toISOString().startsWith(dateString);
// }

function disableFutureDateInputs(inputVal) {
  let year = todaysDate.getFullYear();
  let month = ('0' + (todaysDate.getMonth() + 1)).slice(-2);
  let day = ('0' + todaysDate.getDate()).slice(-2);
  let maxDate = `${year}-${month}-${day}`;

  let result = maxDate >= inputVal ? true : false;

  if (!result) {
    yearErrMessage.innerHTML = `Year must be in the past`;
    return AddInputErrorClass();
  }
  yearErrMessage.innerHTML = '';
  clearInputError();
  return true;
}

function clearInputError() {
  for (const i of inputs) {
    i.classList.contains('error')
      ? i.classList.remove('error')
      : i.classList.add('success');
  }
}

function calculateAge(dobVal) {
  const thisYear = todaysDate.getFullYear();
  const thisMonth = ('0' + (todaysDate.getMonth() + 1)).slice(-2) * 1;
  const today = ('0' + todaysDate.getDate()).slice(-2) * 1;

  if (dobVal === '') return;

  const value = dobVal.split(/\s*\-\s*/g);

  const [dobYear, dobMonth, dobDay] = value;

  // get year, month and day
  yearAge = thisYear - dobYear;
  let monthAge = thisMonth - dobMonth;
  let dayAge = today - dobDay;

  if (thisMonth >= dobMonth) {
    monthAge;
  } else {
    yearAge--;
    monthAge = 12 + thisMonth - dobMonth;
  }

  if (today >= dobDay) {
    dayAge;
  } else {
    monthAge--;
    dayAge = 31 + today - dobDay;
  }

  yearAgeMssg.innerHTML =
    `${yearAge}` > 1 ? `${yearAge} years` : `${yearAge} year`;

  monthAgeMssg.innerHTML =
    `${monthAge}` > 1 ? `${monthAge} months` : `${monthAge} month`;

  dayAgeMssg.innerHTML = `${dayAge}` > 1 ? `${dayAge} days` : `${dayAge} day`;
}
