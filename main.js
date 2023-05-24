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
  disableFutureDateInputs(dateString);

  dateIsValid(dateString);

  // if (isValid) {
  //   console.log('Valid date');
  // } else {
  //   console.log('Invalid');
  // }
});

function dateIsValid(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if date inputed is inline with regex
  if (dateString.match(regex) === null) {
    return AddInputErrorClass();
  }

  const date = new Date(dateString);
  const timeStamp = date.getTime();

  // Check if time stamp is valid
  // An invalid timestamp will return NaN
  if (typeof timeStamp !== 'number' || Number.isNaN(timeStamp)) {
    dayErrMessage.innerHTML = `Must be a valid day`;
    monthErrMessage.innerHTML = `Must be a valid month`;
    return AddInputErrorClass();
  }

  //FIGURE OUT HOW TO REMOVE THE 'MUST BE VALID DAY' AND REPLACE WITH 'MUST BE VALID DATE'
  if (!date.getDate()) {
    dayErrMessage.innerHTML = `Must be a valid date`;
  }
  monthErrMessage.innerHTML = '';
  dayErrMessage.innerHTML = '';
  clearInputError();

  return date.toISOString().startsWith(dateString);
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
  for (const input of inputs) {
    input.classList.add('invalid-input');
  }
}

function clearInputError() {
  for (const input of inputs) {
    input.classList.remove('invalid-input');
  }
}

//disableFutureDateInputs('2024-12-20');
// years - output;
// months - output;
// days - output;
