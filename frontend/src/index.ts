import "./style/normalize.css";
import "./style/main.sass";
import { setAllInputMask } from "./mask"
import { slider } from  "./slider"
import "./modal"
setAllInputMask()


window.onload = () => {
    setAllInputMask()
    slider()
}



