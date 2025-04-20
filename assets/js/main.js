document.addEventListener('DOMContentLoaded', function  () {

    console.log("Inicio");
    /* let dataTip = 0; */
    const numberCount = document.querySelector('.number__count'); 
    const peopleTitle = document.querySelector('.people__title--error');
    const listInput = document.querySelector('.list__input');
    const numberPerson = document.querySelector('.number__person');
    const tipNumber = document.querySelector('.tip__number');
    const peopleNumber = document.querySelector('.people__number')
    const totalNumber = document.querySelector('.total__number');
    const buttonReset = document.querySelector('.button__reset');
    const wrapperList = document.querySelector('.wrapper__list');
    const regexNumber = /[^0-9]/g;
    const validNumbers = {
        tipCount: null,
        tipAmount: null,
        tipPerson : null
    }

    numberCount.addEventListener('input', () => validTip(numberCount, 6));
    numberPerson.addEventListener('input', () => {
        peopleNumber.classList.remove('number__person--error');
        peopleTitle.classList.add('display-none');
        validTip(numberPerson, 2)
        totalValid(numberPerson);
    });
    listInput.addEventListener('input', () => validTip(listInput, 2));
    wrapperList.addEventListener('click', async (e) => {
        if (e.target.tagName === "BUTTON") {
            validNumbers.tipAmount = e.target.dataset.tip
            console.log(validNumbers.tipAmount)
            console.log();
        } else {

        }
    });

    function validTip(total, maxLenght) {
     
        const dataTip = total.dataset.valid; 
        console.log(dataTip);

        if (!total.value || Number(total.value) === 0){
            console.log('el input es 0 o vacio: ', total.value);
            if(dataTip ==="tipPerson"){
                console.log("error  ",dataTip);
                peopleNumber.classList.add('number__person--error');
                peopleTitle.classList.remove('display-none');
            }
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

        }
        
    } 

    function totalValid(total) {
        total.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                total.blur();
                console.log('Saliendo del input con retutn');
            }
        });
        total.addEventListener("blur", () => {
            console.log("Blur total: ", total.value);
        if (validNumbers.tipCount  && validNumbers.tipAmount && validNumbers.tipPerson ) { 
            printTipAmount();
        }   
        }); 
        
    }

    function printTipAmount() {
        const totalTip = (validNumbers.tipCount * validNumbers.tipAmount ) / 100;
        const totalAmount = +validNumbers.tipCount + totalTip;
        const totalPerson = totalAmount / validNumbers.tipPerson;
        const totalTipPerson = totalTip / validNumbers.tipPerson;
        
        tipNumber.textContent = `$${Math.round(totalTipPerson)}` 
        totalNumber.textContent = `$${Math.round(totalPerson)}`; 
        console.log("total tip: ", totalTip);
        console.log("total Print count: ", validNumbers.tipCount);
        console.log("total Print amount: ", totalAmount);
        console.log("total Print person: ", totalPerson);
    }

});
