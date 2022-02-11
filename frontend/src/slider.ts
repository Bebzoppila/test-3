import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import { isValid, TypePatternsType } from "./validate"
export function slider() {
    interface DataSet extends HTMLElement {
        dataset: DOMStringMap
    }

    const mainFormData = {
        totalAmount: '',
        ownership: '',
        transactions: '',
        variants: '',
        name: '',
        phone: '',
        city: 'Москва'
    }


    const allResultItems = document.querySelectorAll('.main-result__item') as NodeListOf<DataSet>
    const firstBtn = document.querySelector('#first')
    const allNextBnts = document.querySelectorAll('.main__btn-next') as NodeListOf<DataSet>
    const allPrefBnts = document.querySelectorAll('.main__btn-pref')
    const mainResult = document.querySelector('.main-result') as HTMLDivElement

    const swiper = new Swiper('.swiper', {
        loop: false,
        allowTouchMove: false
    })

    firstBtn.addEventListener('click', () => {
        swiper.slideNext()
        mainResult.style.display = 'inline-flex'
    })

    allNextBnts.forEach((nextBtn, indx) => {
        nextBtn.addEventListener('click', () => {
            const field = nextBtn.dataset.field as keyof typeof mainFormData | 'result'
            if (field === 'result') {
                swiper.slideNext()
                mainResult.style.display = 'none'
            } else if (mainFormData[field]) {
                swiper.slideNext()
                allResultItems[indx].dataset.active = 'false'
                allResultItems[indx].dataset.successful = 'true'
            }
        })
    })

    allPrefBnts.forEach(prefBtn => {
        prefBtn.addEventListener('click', () => {
            swiper.slidePrev()
        })
    })


    addChangesFromRadio('totalAmount', 0, 'totalAmount')
    addChangesFromRadio('ownership', 1, 'ownership')
    addChangesFromRadio('transactions', 2, 'transactions')
    addChangesFromRadio('variants', 3, 'variants')
    function addChangesFromRadio(name: string, activIndx: number, maiKey: keyof typeof mainFormData) {
        const allRadio = document.querySelectorAll(`[name="${name}"]`) as NodeListOf<HTMLInputElement>

        allRadio.forEach((element) => {
            element.addEventListener('click', () => {
                mainFormData[maiKey] = element.value
                allResultItems[activIndx].dataset.active = 'true'
            })
        });
    }

    // Интпуты
    document.addEventListener('input', (event: FormDataEvent) => {
        const input = event.target as HTMLInputElement

        if (input.type === 'select-one') {
            mainFormData.city = input.value
        }

        if (input.type === 'text') {
            const inPutType = input.name as keyof TypePatternsType
            if (isValid(input.value, inPutType)) {
                input.classList.add('form__input--sucsess')
            }
        }

    })
    // Формы
    document.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        mainFormData.name = form.firstName.value
        mainFormData.phone = form.phone.value
        console.log('Отправка формы', mainFormData);
        if (isValid(mainFormData.name, 'firstName') && isValid(mainFormData.phone, 'phone')) {
            sendToBack(mainFormData)
        } else {
            alert('Произошла ошибка')
        }
    })
}


function sendToBack(formData: any) {
    fetch('http://f0591940.xsph.ru/backend/send.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;'
        },
        body: JSON.stringify(formData)
    })
}