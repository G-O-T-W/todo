export default class UI{
    clearDisplay(){
        const title = document.querySelector('.main-content > h1');
        title.textContent = "";

        const cardsList = document.querySelector('.cards-list');
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            cardsList.removeChild(card);
        })
    }

    display(project){
        this.clearDisplay();
        const title = document.querySelector('.main-content > h1');
        title.textContent = project.name;

        project.todos.forEach((todo) => {
            const card = document.createElement('.div');
            card.classList.add('card');
            
        })
    }
}