import { Controller } from "@hotwired/stimulus"
import { Toast } from "bootstrap"

export default class extends Controller {
    initialize(){       
    }

    connect() {
    }

    getUrl(e) {
        console.log('getUrl Images')
        //копируется в буфер обмена ресурс для отображаемого элемента в которо вызывается обработчик события
        navigator.clipboard.writeText(e.target.src)
        //порождаем событие копи а так же передаем detail
        this.dispatch('copy', { detail: { content: 'Image URL has been copied'}})
    }


}