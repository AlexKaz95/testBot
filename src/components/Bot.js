export class Bot{
    constructor(){

        this.answers = {
            'start': {text: 'Добрый день! Чем я могу вам помочь?', next: null},
            'repeat': {text: 'Что-то еще?', next: null},
            'pizza': {text: 'Без проблем, закажу вашу любимую', next: 'repeat'},
            'clock': {text: 'Хорошо, разбужу вас как обычно', next: 'repeat'},
            'weather': {text: 'Погода отличная для выживания кожаных мешков', next: 'repeat'},
        }

        this.commandStart = {
            'start': 'Cтарт',
        }

        this.command = {
            'pizza': 'Закажи пиццу',
            'clock': 'Заведи будильник',
            'weather': 'Покажи погоду',
        }

        this.pickedCommand = '';
    }

    get pickedCommandText(){
        const id = this.pickedCommand; 

        if (this.answers[id].next) {
            this.pickedCommand = this.answers[id].next;
        } else {
            this.pickedCommand = '';
        }
        
        return this.answers[id].text;
    }
}