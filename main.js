const form = document.getElementById('form-details');
const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
const inputs = document.getElementsByTagName('input');
const yearErrMessage = document.getElementById('err-msg-year');
const monthErrMessage = document.getElementById('err-msg-month');
const dayErrMessage = document.getElementById('err-msg-day');

form.addEventListener('input', (e) => {
  e.preventDefault();
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  const dateString = `${year}-${month}-${day}`;

  // Check if values inputed is valid in line with regex pattern defined
  let regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateString.match(regex) === null) {
    return AddInputErrorClass();
  }

  return [dateIsValid(dateString), disableFutureDateInputs(dateString)];
});

function dateIsValid(dateString) {
  // Create a new Date object with the inputed values(dateString) passed as a parameter
  // Check if time stamp is valid
  // An invalid timestamp will return NaN
  // Check if the input passed is a valid date string by passing it
  // Into the date.toISOString function which returns either a true or false value

  const date = new Date(dateString);
  const timeStamp = date.getTime();
  //FIGURE OUT HOW TO REMOVE THE 'MUST BE VALID DAY' AND REPLACE WITH 'MUST BE VALID DATE'

  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (!isNaN(timeStamp)) {
      // console.log(date.getDate());
    }
  }

  // if (typeof timeStamp !== 'number' || Number.isNaN(timeStamp)) {
  // dayErrMessage.innerHTML = `Must be a valid day`;
  //   monthErrMessage.innerHTML = `Must be a valid month`;
  //   return AddInputErrorClass();
  // }

  monthErrMessage.innerHTML = '';
  dayErrMessage.innerHTML = '';
  clearInputError();

  return dateString;
  //return date.toISOString().startsWith(dateString);
}

function disableFutureDateInputs(inputVal) {
  let todaysDate = new Date();

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
}

function AddInputErrorClass() {
  for (const i of inputs) {
    i.classList.add('invalid-input');
  }
}

function clearInputError() {
  for (const i of inputs) {
    i.classList.remove('invalid-input');
  }
}

//disableFutureDateInputs('2024-12-20');
// years - output;
// months - output;
// days - output;
