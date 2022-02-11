import Inputmask from "inputmask";


export function setAllInputMask(){
    const allPhonInputs = document.querySelectorAll('.form__input--phone') as NodeListOf<HTMLInputElement>
let im = new Inputmask("+9 (999) 999-99-99");
allPhonInputs.forEach(phoneInput => {
    im.mask(phoneInput);
})
}