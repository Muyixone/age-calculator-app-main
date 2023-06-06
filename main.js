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
    AddInputErrorClass();
    return false;
  }

  if (!validateDate(dateString)) return;
  calculateAge(dateString);
});

/*
 * validate input values
 * Create a new Date object with the inputed values(dateString) passed as a parameter
 * Check if time stamp is valid
 * An invalid timestamp will return NaN
 * Check if the input passed is a valid date string by passing it
 */

function validateDate(input) {
  const date = new Date(input);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    AddInputErrorClass();
    monthErrMessage.innerHTML = 'Must be a valid month';
    dayErrMessage.innerHTML = 'Must be a valid day';
    disableFutureYearInput(input);
    return false;
  }
  if (date.getDate() !== Number(input.slice(-2))) {
    dayErrMessage.innerHTML = 'Must be a valid date';
    AddInputErrorClass();
    return false;
  }

  if (disableFutureYearInput(input)) return false;

  clearInputError();
  date.toISOString().startsWith(input);
  return true;
}

// Add or remove error class to input element
function AddInputErrorClass() {
  for (const i of inputs) {
    i.classList.contains('success')
      ? i.classList.remove('success')
      : i.classList.add('error');
  }
}

function clearInputError() {
  for (const i of inputs) {
    i.classList.contains('error')
      ? i.classList.remove('error')
      : i.classList.add('success');
  }
  const smallEl = document.getElementsByTagName('small');
  for (const i of smallEl) {
    i.innerHTML = '';
  }
}

function disableFutureYearInput(inputVal) {
  let year = todaysDate.getFullYear();
  let month = ('0' + (todaysDate.getMonth() + 1)).slice(-2);
  let day = ('0' + todaysDate.getDate()).slice(-2);
  let maxDate = `${year}-${month}-${day}`;

  let result = maxDate >= inputVal ? true : false;

  if (!result) {
    AddInputErrorClass();
    yearErrMessage.innerHTML = `Year must be in the past`;
    return true;
  }
  yearErrMessage.innerHTML = '';
  return;
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
