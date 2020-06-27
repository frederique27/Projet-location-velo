class Map {
    constructor() {
        this.coordonees = [47.2173, -1.5534];
        this.zoom = 13;
        this.myMap();
    }

   myMap() {
        this.map = L.map('mapid').setView(this.coordonees, this.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.addMarker();
   }

   addMarker() {
        let objectMap = this;
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                objectMap.response=JSON.parse(this.responseText);
                for (let i = 0; i < objectMap.response.length; i++) {
                    let marker = new Marker(objectMap.response[i], objectMap.map, i, objectMap.response);
                }
            }
        }
        
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=d58317b9c349f1b097f052fec9676e7f7b7d7d66"); 
        request.send();
    }
}
    

