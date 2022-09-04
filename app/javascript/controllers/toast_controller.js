import { Controller } from "@hotwired/stimulus"
import { Toast } from "bootstrap"

export default class extends Controller {
    initialize()
    {
        console.log('TOAST CONTROLLER')
        this.toast = new Toast(
            document.getElementById('copyToast')
        )
    }
    connect() {
    }

    show({detail: {content}}){
        this.toast._element.querySelector('.toast-body').innerText = content
        this.toast.show()
    }

}