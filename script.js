const formEl = document.querySelector('form');

const emailFieldEl = document.querySelector('input[name="email"]');
const phoneFieldEl = document.querySelector('input[name="phone"]');
const childBirthdateFieldEls = document.querySelectorAll('input[name="child-birthdate"]');
const senderBirthdayEl = document.querySelector('input[name="sender-birthday"]');
let hiddenChildInputGroupEls = document.querySelectorAll('.child-input-group.hidden');
const estimatedBirthdateFieldEl = document.querySelector('input[name="estimated-birthdate"]');

const addChildBtn = document.querySelector('.add-child-btn');
const pregnancyBtn = document.querySelector('.pregnancy-btn');

const emailErrorEl = document.querySelector('.email-error');
const phoneErrorEl = document.querySelector('.phone-error');

const overlayEl = document.querySelector('.overlay');

// https://www.scaler.com/topics/email-validation-in-javascript/
function isValidEmail(email) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

// https://www.regextester.com/104924
function isValidIsraeliMobilePhone(phone) {
    const regex = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
    return regex.test(phone);
}

function isFieldDataValid() {

    const email = emailFieldEl.value;
    const phone = phoneFieldEl.value;

    if (!isValidEmail(email)) {
        emailErrorEl.classList.remove('hidden');
        emailFieldEl.classList.add('input-error');
        return false;
    }

    if (!isValidIsraeliMobilePhone(phone)) {
        phoneErrorEl.classList.remove('hidden');
        phoneFieldEl.classList.add('input-error');
        return false;
    }

    return true;
}

childBirthdateFieldEls.forEach(el => {
    el.max = new Date().toISOString().split("T")[0];
    el.addEventListener('focus', () => el.type = 'date');
    el.addEventListener('input', () => el.setAttribute('data-format-placeholder', ""));
});

senderBirthdayEl.max = new Date().toISOString().split("T")[0];
senderBirthdayEl.addEventListener('focus', () => senderBirthdayEl.type = 'date');
senderBirthdayEl.addEventListener('input', () => senderBirthdayEl.setAttribute('data-format-placeholder', ""));


estimatedBirthdateFieldEl.min = new Date().toISOString().split("T")[0];
estimatedBirthdateFieldEl.addEventListener('focus', () => estimatedBirthdateFieldEl.type = 'date');
estimatedBirthdateFieldEl.addEventListener('input', () => estimatedBirthdateFieldEl.setAttribute('data-format-placeholder', ""));

addChildBtn.addEventListener('click', () => {
    hiddenChildInputGroupEls[0].classList.remove('hidden');
    hiddenChildInputGroupEls = document.querySelectorAll(".child-input-group.hidden");
    hiddenChildInputGroupEls.length ? false : addChildBtn.remove();
});

pregnancyBtn.addEventListener('click', () => {
    estimatedBirthdateFieldEl.classList.remove('hidden');
    pregnancyBtn.remove();
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isFieldDataValid()) {
        overlayEl.classList.remove('hidden');
        fetch('https://dummyjson.com/products/1')
        .then(() => {
            window.location.href = '/shilav-data-optimization-form/thank-you-page/';
        });
    }
});

emailFieldEl.addEventListener('focus', () => {
    emailErrorEl.classList.add('hidden');
    emailFieldEl.classList.remove('input-error');
    emailFieldEl.value = '';
});

phoneFieldEl.addEventListener('focus', () => {
    phoneErrorEl.classList.add('hidden');
    phoneFieldEl.classList.remove('input-error');
    phoneFieldEl.value = '';
});