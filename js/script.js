"use strict";
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayResult = document.getElementById("resDay");
const monthResult = document.getElementById("resMonth");
const yearResult = document.getElementById("resYear");
const form = document.querySelector("form");

const date = new Date();
let currentDay = date.getDate();
let currentMonth = 1 + date.getMonth();
let currentYear = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function clearErrors() {
  document.querySelectorAll("h6").forEach((h6) => {
    h6.innerText = "";
    h6.classList.remove("error-message");
  });
  [dayInput, monthInput, yearInput].forEach((input) => {
    input.style.borderColor = "var(--light-grey)";
    input.previousElementSibling.style.color = "initial";
  });
}

function validateDay() {
  if (!dayInput.value) {
    dayInput.style.borderColor = "var(--light-red)";
    dayInput.nextElementSibling.innerText = "This field is required.";
    dayInput.previousElementSibling.style.color = "var(--light-red)";
    dayInput.nextElementSibling.classList.add("error-message");
    return false;
  } else if (dayInput.value < 1 || dayInput.value > 31) {
    dayInput.style.borderColor = "var(--light-red)";
    dayInput.nextElementSibling.innerText = "Must be a valid day.";
    dayInput.previousElementSibling.style.color = "var(--light-red)";
    dayInput.nextElementSibling.classList.add("error-message");
    return false;
  }
  dayInput.style.borderColor = "var(--light-grey)";
  return true;
}

function validateMonth() {
  if (!monthInput.value) {
    monthInput.style.borderColor = "var(--light-red)";
    monthInput.nextElementSibling.innerText = "This field is required.";
    monthInput.previousElementSibling.style.color = "var(--light-red)";
    monthInput.nextElementSibling.classList.add("error-message");
    return false;
  } else if (monthInput.value < 1 || monthInput.value > 12) {
    monthInput.style.borderColor = "var(--light-red)";
    monthInput.nextElementSibling.innerText = "Must be a valid month.";
    monthInput.previousElementSibling.style.color = "var(--light-red)";
    monthInput.nextElementSibling.classList.add("error-message");
    return false;
  }
  monthInput.style.borderColor = "var(--light-grey)";
  return true;
}

function validateYear() {
  if (!yearInput.value) {
    yearInput.style.borderColor = "var(--light-red)";
    yearInput.nextElementSibling.innerText = "This field is required.";
    yearInput.previousElementSibling.style.color = "var(--light-red)";
    yearInput.nextElementSibling.classList.add("error-message");
    return false;
  } else if (yearInput.value < 1900 || yearInput.value > currentYear) {
    yearInput.style.borderColor = "var(--light-red)";
    yearInput.nextElementSibling.innerText = "Must be in the past.";
    yearInput.previousElementSibling.style.color = "var(--light-red)";
    yearInput.nextElementSibling.classList.add("error-message");
    return false;
  }
  yearInput.style.borderColor = "var(--light-grey)";
  return true;
}

function validate() {
  clearErrors();
  let isDayValid = validateDay();
  let isMonthValid = validateMonth();
  let isYearValid = validateYear();
  return isDayValid && isMonthValid && isYearValid;
}

function calculateDay(tempDay, tempMonth) {
  if (dayInput.value > tempDay) {
    tempDay += months[tempMonth - 1];
    tempMonth -= 1;
  }
  return tempDay - dayInput.value;
}

function calculateMonth(tempMonth, tempYear) {
  if (monthInput.value > tempMonth) {
    tempMonth += 12;
    tempYear -= 1;
  }
  return tempMonth - monthInput.value;
}

function calculateYear(tempYear) {
  return tempYear - yearInput.value;
}

function animateValue(element, start, end, duration) {
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.innerHTML = value;
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

function calculateAge() {
  let tempDay = currentDay;
  let tempMonth = currentMonth;
  let tempYear = currentYear;

  const day = calculateDay(tempDay, tempMonth);
  const month = calculateMonth(tempMonth, tempYear);
  const year = calculateYear(tempYear);

  dayResult.innerHTML = day;
  monthResult.innerHTML = month;
  yearResult.innerHTML = year;
  animateValue(dayResult, 0, day, 1000);
  animateValue(monthResult, 0, month, 1000);
  animateValue(yearResult, 0, year, 1000);
}

function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    calculateAge();
  }
}

form.addEventListener("submit", handleSubmit);
