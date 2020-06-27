class Slider {
    constructor() {
        this.images = [['images/bike1.jpg', "Choisissez votre station de vélo sur la map"], 
                       ['images/bike2.jpg', "Remplissez le formulaire d'inscription"], 
                       ['images/bike3.jpg', "Signez"], 
                       ['images/bike4.jpg', "Vous avez 20 minutes pour finaliser votre réservation"]];
        this.time = 5000;
        this.i = 0;
        this.changeImg();
        this.nextImage();
        this.prevImage();
        this.stopImage();
        this.keyboard();
    }


    changeImg(sens) {
        clearInterval(this.timeout);
        document.slide.src = this.images[this.i][0];
        document.getElementById('textImg').innerHTML = "";
        let titleSlide = document.createElement('h2');
        titleSlide.innerHTML = this.images[this.i][1];
        document.getElementById('textImg').appendChild(titleSlide);
        if (sens == 1) {
            if(this.i < this.images.length -1) {
                this.i++;
            } else {
                this.i = 0;
            }
        } else if(sens == -1) {
            if(this.i <= this.images.length - 1 && this.i > 0) {
                this.i--;
            } else {
                this.i = this.images.length -1;
            }
        }
        this.autoPlay();
    }

    autoPlay() {
        this.timeout = setInterval(() => {
            this.changeImg(1);
        }, this.time);
    }


    nextImage() {
        document.getElementById('btnRight').addEventListener('click', () => {
            this.changeImg(1);
        })  
    }

    prevImage() {
        document.getElementById('btnLeft').addEventListener('click', () => {
            this.changeImg(-1);
        })  
    }

    stopImage() {
        document.getElementById('btnPause').addEventListener('click', () => {
            clearInterval(this.timeout);
        })  
    }

    keyboard() { 
        addEventListener('keydown', (e) => {
            if (e.keyCode === 37){
                this.changeImg(-1);
            }
            else if(e.keyCode === 39){
                this.changeImg(1);
            }
        })
    }
}
