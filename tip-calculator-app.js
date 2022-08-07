const tipBtnGroup = document.querySelector('.tip-btn-group');
let currentBill = 0;
let currentPeople = 0;

// --- Tip Percent

tipBtnGroup.addEventListener('click', (e) => {
    tipBtnGroup.querySelectorAll('.tip-btn').forEach((button) => {
        button.classList.remove('selected');
    });
    e.target.classList.add('selected');
    if (e.target.classList.contains('custom-tip')) {
        e.target.addEventListener('keyup', () => {
            if (currentBill > 0 && currentPeople >= 1) {
                console.log(currentBill, currentPeople);
                calculateTip(currentBill, currentPeople);
            }
        });
    }
    if (currentBill > 0 && currentPeople >= 1) {
        console.log(currentBill, currentPeople);
        calculateTip(currentBill, currentPeople);
    }
});

const billInput = document.querySelector('[data-bill]');
const peopleInput = document.querySelector('[data-people]');
const tipPerPersonEl = document.querySelector('[data-tip-person]');
const totalPerPersonEl = document.querySelector('[data-total-person]');
const resetBtn = document.querySelector('[data-reset]');

// --- Bill

billInput.addEventListener('keyup', (e) => {
    const bill = Number(e.target.value);
    resetBtn.removeAttribute('disabled');
    // currentBill = bill > 0 ? bill : 0;
    if (bill >= 0) {
        currentBill = bill;
        calculateTip(currentBill, currentPeople);
    } else {
        currentBill = 0;
        document.querySelector('[data-bill]').value = '';
    }

    if (currentBill === 0 && currentPeople === 0) {
        resetBtn.setAttribute('disabled', '');
    }
});

// --- People

peopleInput.addEventListener('keyup', (e) => {
    const people = Number(e.target.value);
    resetBtn.removeAttribute('disabled');
    // currentPeople = people > 0 ? people : 0;
    if (people >= 0) {
        currentPeople = people;
        calculateTip(currentBill, currentPeople);
    } else {
        currentPeople = 0;
        document.querySelector('[data-people]').value = '';
    }

    if (currentBill === 0 && currentPeople === 0) {
        resetBtn.setAttribute('disabled', '');
    }
});

// --- Reset

resetBtn.addEventListener('click', () => {
    reset();
    document.querySelector('.custom-tip').value = '';
});
window.addEventListener('DOMContentLoaded', () => {
    reset();
    document.querySelector('.custom-tip').value = '';
});

function calculateTip(bill, people) {
    if (people >= 1) {
        const tipPercent =
            Number(document.querySelector('.selected').value) / 100;
        const tip = bill * tipPercent;
        const tipPerPerson = tip / people;
        const totalPerPerson = bill / people + tipPerPerson;
        tipPerPersonEl.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalPerPersonEl.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
        tipPerPersonEl.textContent = `$0.00`;
        totalPerPersonEl.textContent = `$0.00`;
    }
}

function reset() {
    currentBill = 0;
    currentPeople = 0;
    billInput.value = '';
    peopleInput.value = '';
    tipPerPersonEl.textContent = `$0.00`;
    totalPerPersonEl.textContent = `$0.00`;
    resetBtn.setAttribute('disabled', '');
}
