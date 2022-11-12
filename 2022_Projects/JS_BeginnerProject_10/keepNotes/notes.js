const saveDataLocalStorage = () => {
    const textAreaData = document.querySelectorAll('textarea');
    console.log(textAreaData);
    let datas = [];
    textAreaData.forEach((elem) => datas.push(elem.value));
    console.log(datas);
    localStorage.setItem('allNotes', JSON.stringify(datas));
}

const createNewNote = (text = '') => {

    const container = document.querySelector('.container');
    const note = document.createElement('div');
    note.classList.add("note");

    const htmlData =
        `<div class="operator">
        <span class="editNote"><i class="fa-solid fa-pen-to-square"></i></span>
        <span class="deleteNote"><i class="fa-solid fa-trash-can"></i></span>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>`

    note.insertAdjacentHTML('afterbegin', htmlData);
    container.appendChild(note);


    const deleteBtn = note.querySelector(".deleteNote");
    const editNote = note.querySelector('.editNote');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    textarea.value = text;
    mainDiv.innerHTML = text;

    //delete note
    deleteBtn.addEventListener('click', ()=>{
        note.remove();
        saveDataLocalStorage();
    });
    editNote.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (e) => {
        const value = e.target.value;
        mainDiv.innerHTML = value;
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
        saveDataLocalStorage();
    })
    

}
//getting all data from localStorage
const allNotes = JSON.parse(localStorage.getItem('allNotes'));
if(allNotes) allNotes.forEach((elem) => { createNewNote(elem) });

const addNote = document.querySelector('.addNote');
addNote.addEventListener('click', () => { createNewNote() });