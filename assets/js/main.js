document.addEventListener('DOMContentLoaded', function  () {

    const numberCount = document.querySelector('.number__count'); 
    const peopleTitle = document.querySelector('.people__title--error');
    const listInput = document.querySelector('.list__input');
    const numberPerson = document.querySelector('.number__person');
    const tipNumber = document.querySelector('.tip__number');
    const peopleNumber = document.querySelector('.people__number')
    const totalNumber = document.querySelector('.total__number');
    const buttonReset = document.querySelector('.button__reset');
    const wrapperNumber = document.querySelector('.wrapper__number');
    const wrapperList = document.querySelector('.wrapper__list');
    const regexNumber = /[^0-9]/g;
    const validNumbers = {
        tipCount: null,
        tipAmount: null,
        tipPerson : null
    }

    numberCount.addEventListener('input', () => {
        wrapperNumber.classList.remove('number__person--error');
        validTip(numberCount, 6)
        totalValid(numberCount);
    });
    numberPerson.addEventListener('input', () => {
        peopleNumber.classList.remove('number__person--error');
        peopleTitle.classList.add('display-none');
        validTip(numberPerson, 2)
        totalValid(numberPerson);
    });
    listInput.addEventListener('input', () => {
        listInput.classList.remove('number__person--error');
        validTip(listInput, 2);
        totalValid(numberPerson);
    });

    wrapperList.addEventListener('click', async (e) => {
        if (e.target.tagName === "BUTTON") {
            validNumbers.tipAmount = e.target.dataset.tip
            printTipAmount(); 
        }
    });

    buttonReset.addEventListener('click', () => {
        console.log("click Reset");
        inputReset();
    });

    function validTip(total, maxLenght) {
     
        const dataTip = total.dataset.valid; 
        console.log(dataTip);

        if (!total.value || Number(total.value) === 0){
            console.log('el input es 0 o vacio: ', total.value);
            errorNumber(dataTip); 
            return false;
        }

        if (!regexNumber.test(total.value) && total.value.length <= maxLenght) {
            validNumbers.dataTip = total.value;
            if (dataTip === "tipCount") {
                validNumbers.tipCount = total.value;
                console.log("tipCount : ", validNumbers.tipCount);
            } else if (dataTip === "tipPerson") {
                validNumbers.tipPerson = total.value;
                console.log("tipPerson : ", validNumbers.tipPerson);
            } else {
                validNumbers.tipAmount = total.value;
                console.log("Tid Amount: ", validNumbers.tipAmount);
            }
        } else {
            errorNumber(dataTip);
            total.blur();
        }
    } 

    function errorNumber(data) {
        if(data ==="tipPerson"){
            console.log("error-person: ",data);
            peopleNumber.classList.add('number__person--error');
            peopleTitle.classList.remove('display-none');

        } else if (data === "tipCount") {
            console.log("error-count: ", data);
            wrapperNumber.classList.add('number__person--error');
        } else {
            listInput.classList.add('number__person--error');
            console.log("error-custon: ", data);
        }
    };


    function totalValid(total) {
        total.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                total.blur();
                printTipAmount();
            }
        });
        total.addEventListener("blur", () => {
            printTipAmount();
        }); 
    };

    function printTipAmount() {

        const validPrint = validNumbers.tipCount > 0 && validNumbers.tipAmount > 0 && validNumbers.tipPerson > 0;
        
        if (validPrint) { 
            const totalTip = (validNumbers.tipCount * validNumbers.tipAmount ) / 100;
            const totalAmount = +validNumbers.tipCount + totalTip;
            const totalPerson = totalAmount / validNumbers.tipPerson;
            const totalTipPerson = totalTip / validNumbers.tipPerson;
            
            tipNumber.textContent = `$${Math.round(totalTipPerson)}` 
            totalNumber.textContent = `$${Math.round(totalPerson)}`; 

            buttonReset.classList.remove('button__reset--empty');

            }else {
                tipNumber.textContent = "$0"; 
                totalNumber.textContent = "$0"; 
                console.log('falta un dato');
            };
    };
    
    function inputReset() {
        tipNumber.textContent = "$0"; 
        totalNumber.textContent = "$0"; 
        listInput.value = ""  ;
        numberPerson.value = ""  ;
        numberCount.value = ""  ;
        validNumbers.tipPerson = null;
        validNumbers.tipAmount = null;
        validNumbers.tipNumber = null;
        wrapperNumber.classList.remove('number__person--error');
        listInput.classList.remove('number__person--error');
        peopleNumber.classList.remove('number__person--error');
        peopleTitle.classList.add('display-none');

        buttonReset.classList.add('button__reset--empty');
        console.log('paso reset');
    }

});
