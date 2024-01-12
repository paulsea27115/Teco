const write_modal = document.querySelector('.write')
const write_btn = document.querySelector('.write_btn')

write_btn.addEventListener("click", (e)=>{
    write_modal.classList.toggle('on')
})