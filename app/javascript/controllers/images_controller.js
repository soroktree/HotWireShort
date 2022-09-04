import { Controller } from "@hotwired/stimulus"
import { patch } from '@rails/request.js'

export default class extends Controller {
    static targets = [ 'image', 'title', 'save' ]
    static classes = [ 'loading' ]
    static values = {
        id: String
    }

    initialize(){       
    }

    connect() {
        console.log('Create Btn')
        const title = document.createElement('p')
        title.textContent = this.imageTarget.alt
        title.contentEditable = true
        title.dataset.imagesTarget = 'title'
        title.dataset.action = 'click->images#editTitle'
        this.element.appendChild(title)
    }

    editTitle(e){
        if(!this.hasSaveTarget){
            const btn = document.createElement('button')
            btn.textContent = 'Save'
            btn.classList = 'btn btn-primary btn-sm'

            btn.dataset.imagesTarget = 'save'
            btn.dataset.action = 'click->images#saveTitle'
            e.target.insertAdjacentElement('afterend', btn)
        }
    }

    async saveTitle(e){
        e.preventDefault()
        e.target.disabled = true 
        //для btn работает атрибут disabled в дургих случаях надо создать класс disabled 
        e.target.classList.add(this.loadingClass)

        // const formData = new FormData()
        // formData.append('image[title]', this.titleTarget.innerText)

        await this.doPatch(`/api/images/${this.idValue}`,JSON.stringify({
            image: {
                title: this.titleTarget.innerText
            }
        }))

        e.target.remove()
    }

    getUrl(e) {
        console.log('getUrl Images')
        //копируется в буфер обмена ресурс для отображаемого элемента в которо вызывается обработчик события
        navigator.clipboard.writeText(e.target.src)
        //порождаем событие копи а так же передаем detail
        this.dispatch('copy', { detail: { content: 'Image URL has been copied'}})
    }

    imageTargetConnected(element){
        console.log(element)
    }

    titleTargetConnected(element){
        console.log(element)
    }

    async doPatch(url,body) {
        const response = await patch( url, {body: body })

        if(!response.ok) {
            raise("failed")
        }
        // const csrfToken = document.getElementsByName('csrf-token')[0].content

        // await fetch(url, {
        //     method: 'PATCH',
        //     body: body,
        //     headers: {
        //         "X-CSRF-Token": csrfToken
        //     }
        // })
    }
}