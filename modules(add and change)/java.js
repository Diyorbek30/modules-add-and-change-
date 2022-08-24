import { data } from './modules/db.js'
let btn_open = document.querySelector('.open')
let modal = document.querySelector('.modal')
let main = document.querySelector('main')
let btn_hiden = document.querySelector('.btn_hiden')
let form = document.forms.search
let one_hundred = document.querySelector('.one_hundred')
let two_hundred = document.querySelector('.two_hundred')
let a = one_hundred.value || 0
let b = two_hundred.value || 0


btn_open.onclick = () => {
    modal.classList.add('active_modal')
    add(data)
}
btn_hiden.onclick = () => {
}

function add(AddArr) {

    

    let inp1 = document.querySelector('#name')
    let inp2 = document.querySelector('#left')



        let btn_change = document.querySelector('.btn_change')

        btn_change.onclick = () => {
    
            
        let task = {
            "userId": Math.round(Math.random() * 2000),
            "id": Math.round(Math.random() * 5000),
            "title": inp1.value,
            "completed": false,
            "left": inp2.value
        }
    
        let fm = new FormData(form)
    
        fm.forEach((value, key) => {
            task[key] = value
        })
    
        AddArr.push(task)
        reload(AddArr)
        }
    btn_hiden.onclick = () => {

        modal.classList.remove('active_modal')
    }





}


form.onsubmit = (event) => {

    event.preventDefault()

    let filtered = data.filter((item) => {
        if (b > 0) {
            if (item.left > a && item.left < b) {
                return item
            }
        } else if (a === 0) {
            if (item.left < b) {
                return item
            }
        } else {
            if (item.left > a) {
                return item
            }
        }
    });

    reload(filtered)


}

let openModal = (item) => {
    modal.classList.add('active_modal')
    let nameInp = modal.querySelector('#name')
    let leftInp = modal.querySelector('#left')
    let btn_change = modal.querySelector('.btn_change')
    let btn_hiden = modal.querySelector('.btn_hiden')


    nameInp.value = item.title
    leftInp.value = item.left


    btn_change.onclick = () => {
        let finded = data.find(elem => elem.id === item.id)
        finded.title = nameInp.value
        finded.left = leftInp.value

        nameInp.value = ""
        leftInp.value = ""

        reload(data)
        closeModal()
    }

    btn_hiden.onclick = () => {
        nameInp.value = ""
        leftInp.value = ""

        closeModal()
    }
}
let closeModal = () => {
    modal.classList.remove('active_modal')
}

function reload(arr) {
    main.innerHTML = ""

    for (let item of arr) {
        let box = document.createElement('div')
        let p = document.createElement('p')
        let span = document.createElement('span')

        box.classList.add('box_element')
        p.classList.add('p_box')
        span.classList.add('box_span')

        p.innerHTML = item.title.slice(0, 7)
        span.innerHTML = item.left

        box.append(p, span)
        main.append(box)

        // functions
        box.onclick = () => {
            openModal(item)
        }
    }
}

reload(data)