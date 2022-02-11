import { setAllInputMask } from "./mask"
import { isValid, TypePatternsType } from "./validate"
const headerBtn = document.querySelector(".header__btn") as HTMLDListElement;
const headerModal = document.querySelector('#modal-header')
const headerModalClose = document.querySelector('#modal-header-close')


headerBtn.addEventListener("click", () => {
    headerModal.classList.add('modal--open')
    blockScroll()
});

headerModalClose.addEventListener('click', () => {
    headerModal.classList.remove('modal--open')
    unBlockScroll()
})

function unBlockScroll(){
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px'
}

function blockScroll(){
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'
}

class Modal {

    modalInner = document.querySelector('.modal-inner')

    public renderHeaderModal() {
        const form = document.createElement('form')
        form.classList.add('header-form')
        form.innerHTML = `<div class="form__item">
                <input name="firstName" required placeholder="Ваше имя" class="form__input" type="text" />
                        </div>
                <div class="form__item">
                    <input name="phone" minlength="11" required placeholder="Ваш телефон" class="form__input form__input--phone" type="text" />
                </div>
                <button type="submit" class="form__btn">
                        Получить консультацию юриста
                    </button>
                <span class="form__hint">*отправляя формы на данном
                        сайте,
                        вы даете
                        согласие на обработку
                        персональных данных в соответствии с 152-ФЗ
                    </span>`
        form.onsubmit = () => {
            if(isValid(form.firstName.value, 'firstName') && isValid(form.phone.value, 'phone')){
                this.renderSuccsessfull()
            }
            
        }
        const title = document.createElement('h3')
        title.classList.add('modal__subtitle')
        title.innerText = 'Укажите ваши контактные данные'
        this.modalInner.append(title, form)
        setAllInputMask()
    }

    private renderSuccsessfull(){
        this.modalInner.innerHTML = ''
        const thanks = document.createElement('div')
        thanks.classList.add('thank')
        thanks.innerHTML = `<h2 class="thank__title">Благодарим за заявку!</h2>
        <h3 class="thank__subtitle">Ожидайте звонка нашего юриста <br> с номера</h3>
        <a class="thank__phone" href="tel:84952302155">8 495 230
                21 55</a>
        <div class="thank__content">
            <h4 class="thank__content-text">Узнайте о нас больше</h4>
            <div class="thank__content-items">
                <a class="thank__content-link" href="">
                    <img src="./src/images/social/telegram.png" alt="Телеграмм" />
                </a>
                <a class="thank__content-link" href="">
                    <img src="./src/images/social/vk.png" alt="Вк" />
                </a>
                <a class="thank__content-link" href="">
                    <img src="./src/images/social/OK.png" alt="Одноклассники" />
                </a>
                <a class="thank__content-link" href="">
                    <img src="./src/images/social/instagram.png" alt="Интсраграмм" />
                </a>
            </div>
        </div>
        `
        this.modalInner.append(thanks)
    }


    public renderClosePage(){
        headerModal.classList.add('modal--open')
        const leavs = document.createElement('div')
        leavs.classList.add('leaves')
        leavs.innerHTML = `
        <h2 class="leaves__title">Скидка 33%</h2>
        <h3 class="leaves__subtitle">на лиды в вашем городе</h3>
        <h4 class="leaves__help">Укажите регион и узнайте, действует ли скидка</h4>
        <select class="select" name="city" id="">
            <option  value="Москва">Москва</option>
            <option value="Питер">Питер</option>
            <option value="Остана">Остана</option>
        </select>
        `
        const btn = document.createElement('button')
        btn.classList.add('leaves__btn')
        btn.innerText = 'Получить скидку'
        btn.onclick = () => {
            this.renderCloseForm()
        }
        this.modalInner.innerHTML = ''
        this.modalInner.append(leavs, btn)
    }

    public renderCloseForm(){
        const form = document.createElement('form')
        form.classList.add('form')
        form.classList.add('main-form')
        form.classList.add('leaves-form')
        form.onsubmit = () => {
            if(isValid(form.firstName.value, 'firstName') && isValid(form.phone.value, 'phone')){
                this.renderSuccsessfull()
            }
        }
        form.innerHTML = `
        <div class="form__item">
        <input name="firstName" required placeholder="Ваше имя" class="form__input" type="text" />
    </div>
    <div class="form__item">
        <input name="phone" required placeholder="Ваш телефон" class="form__input form__input--phone" type="text" />
    </div>
    <button data-field="result" type="submit" class="form__btn main__btn-next">
            Получить консультацию юриста
        </button>
    <span class="form__hint">*отправляя
            формы на данном сайте,
            вы даете
            согласие на обработку
            персональных данных в соответствии с 152-ФЗ
        </span>
        `
        const leaves = document.createElement('div')
        leaves.classList.add('leaves')
        leaves.innerHTML = `
            <h2 class="leaves__title">Скидка 33%</h2>
            <h3 class="leaves__subtitle">на лиды в вашем городе</h3>
            <h4 class="leaves__help">Укажите ваши данные для связи</h4>
        `
        leaves.appendChild(form)
        this.modalInner.innerHTML = ''
        this.modalInner.append(leaves)
        setAllInputMask()
    }

}

const modal = new Modal
document.addEventListener(('DOMContentLoaded'), () => {
    modal.renderHeaderModal()
})

window.onbeforeunload = confirmExit;
function confirmExit() {
    modal.renderClosePage()
    blockScroll()
    
    return "You have attempted to leave this page. Are you sure?";
}

