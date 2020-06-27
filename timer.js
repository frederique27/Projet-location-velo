class Timer {
    constructor() {
        this.duree = 20;
        this.eventAnnulation();
    }

    counter() {
        clearInterval(this.interval);
        let minutes;
        let secondes;
        let dateFin =  sessionStorage.getItem('timer') / 1000 + this.duree * 60;
        let count = dateFin - (Date.now() / 1000);
    
        let convert = (s) => {
            minutes = Math.floor(s / 60);
            secondes = Math.floor(s % 60); //reste de s
            return minutes + ':' + secondes;
        }
    
        this.interval = setInterval(() => {
            count--;
            if(count >= 0) {
                document.getElementById('timer').innerHTML = convert(count);
            } else {
                this.annuler();
            }
        }, 1000); 
    }

    eventAnnulation() {
        document.getElementById('annuler').addEventListener('click', () => {
            this.annuler();
        })
    }

    annuler() {
        sessionStorage.clear();
        clearInterval(this.interval);
        document.getElementById('timer_info').style.display = 'none';   
    }
}
