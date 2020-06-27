class Controleur {
    constructor() {
        this.dureeTimer = 20; //A changer aussi dans Timer
        this.previousData();
    }

    previousData() {
        let previousName = localStorage.getItem('nom');
        let previousFname = localStorage.getItem('prenom');
        document.getElementById('lname').value = previousName;
        document.getElementById('fname').value = previousFname;

        let barre = sessionStorage.getItem('barre');
        let phrase = sessionStorage.getItem('phrase');
        if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000) {
            document.getElementById('timer_info').style.display = barre;
            myTimer.counter();
            document.getElementById('info_reservation').innerHTML = phrase;
        } 
    }
}