class Marker {
    constructor (station, map, index, response) {
        this.station = station;
        this.map = map;
        this.index = index;
        this.reponse = response;
        this.lname;
        this.fname;
        this.emptyIcon();
        this.lowIcon();
        this.midIcon();
        this.highIcon();
        this.fullIcon();
        this.currentIcon();
        this.addMarker();
    }

    addMarker() {
        this.leafletMarker = L.marker(this.station.position, {icon: this.trueIcon});
        this.leafletMarker.addTo(this.map).on('click', (e) => {
            let blockSignature = document.getElementById('signature').style.display;
            if(blockSignature == 'block') {
                location.reload();
            }
            e = 1;
            this.showInfo();
            document.getElementById('envoyer').addEventListener('click', (event) => {
                if (e == 1) {
                    event.preventDefault();
                    this.reservation();
                }
            })
        })
    }

    reservation() {
        this.lname = document.getElementById('lname').value;
        this.fname = document.getElementById('fname').value;
        if (this.lname.length > 1 && this.fname.length > 1 && this.station.status == 'OPEN') {
            document.getElementById('signature').style.display = 'block';
        } else {
            alert("Veuillez écrire votre nom et prénom complet");
        }
        document.getElementById('reserver').addEventListener('click', () => {
            if(this.station.available_bikes != 0 && myCanva.count > 40) {
                let styleBarre = document.getElementById('timer_info').style.display = 'flex';
                document.getElementById('signature').style.display = 'none';
                window.scrollTo(0,1e10);
                localStorage.setItem('nom', this.lname);
                localStorage.setItem('prenom', this.fname);
                sessionStorage.setItem('timer', Date.now());
                sessionStorage.setItem('barre', styleBarre);
                let phrase = 'Votre réservation au nom de ' + this.lname + ' ' + this.fname +  ' à l\'adresse ' + this.station.address + ' expirera dans';
                sessionStorage.setItem('phrase', phrase);
                document.getElementById('info_reservation').innerHTML = phrase;
                myTimer.counter();
            } else if (this.station.available_bikes == 0) {
                alert("Il n'y a pas de vélo disponible");
            } else if (myCanva.count < 41) {
                alert("Veuillez refaire votre signature");
            }
            
        })
    } 
    
    showInfo() {
        if (this.station.status == "OPEN") {
            document.getElementById('open_close').innerHTML = "Cette station est ouverte!";
        } else {
            document.getElementById('open_close').innerHTML = "Cette station est fermée";
        }
        document.getElementById('adresse').innerHTML = "Adresse: " + this.station.address; 
        document.getElementById('velo_dispo').innerHTML = "Nombre de vélos dispo: " + this.station.available_bikes;
        document.getElementById('place_dispo').innerHTML = "Nombre de places dispo: " + this.station.available_bike_stands;
    }

    emptyIcon() {
        this.emptyIcon = L.icon({
            iconUrl: 'images/marker-empty.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    lowIcon() {
        this.lowIcon = L.icon({
            iconUrl: 'images/marker-low.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    midIcon() {
        this.midIcon = L.icon({
            iconUrl: 'images/marker-mid.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    highIcon() {
        this.highIcon = L.icon({
            iconUrl: 'images/marker-high.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    fullIcon() {
        this.fullIcon = L.icon({
            iconUrl: 'images/marker-full.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    currentIcon() {
        if (this.station.available_bikes == 0) {
            this.trueIcon = this.emptyIcon;
        } else if (this.station.available_bikes > 0 && this.station.available_bikes < 4) {
            this.trueIcon = this.lowIcon;
        } else if (this.station.available_bikes > 3 && this.station.available_bikes < 7) {
            this.trueIcon = this.midIcon;
        } else if (this.station.available_bikes > 6 && this.station.available_bike_stands != 0 ) {
            this.trueIcon = this.highIcon;
        } else if (this.station.available_bike_stands == 0) {
            this.trueIcon = this.fullIcon;
        }
    }
}