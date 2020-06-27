class Canva {
    constructor() {
        this.myCanvas = document.getElementById("sign_square");
        this.context = this.myCanvas.getContext("2d");
        this.limitCanvas = null;
        this.x = 0;
        this.y = 0;
        this.drawingSignature = false;
        this.count = 0;
        this.increaseCount = false;
        this.eventListennerDesktop();
        this.eventListennerTactile();
    }

    eventListennerDesktop() {        
        this.myCanvas.addEventListener('mousedown', (e) => {   
            this.limitCanvas = this.myCanvas.getBoundingClientRect(); //renvoie la taille et la position
            this.drawingSignature = true;
            this.x = e.clientX - this.limitCanvas.left; //coordonnees
            this.y = e.clientY - this.limitCanvas.top;
            this.increaseCount = true;
        })

        this.myCanvas.addEventListener('mousemove', (e) => { 
            if (this.drawingSignature === true) {
                let xCanvas = e.clientX - this.limitCanvas.left;
                let yCanvas = e.clientY - this.limitCanvas.top;
                this.draw(this.x, this.y, xCanvas, yCanvas);
                this.x = xCanvas;
                this.y = yCanvas;
                if (this.increaseCount === true){
                    this.count++;
                } 
            }
        })
        
        this.myCanvas.addEventListener('mouseup', (e) => { 
            if(this.drawingSignature === true) {
                let xCanvas = e.clientX - this.limitCanvas.left;
                let yCanvas = e.clientY - this.limitCanvas.top;
                this.draw(this.x, this.y, xCanvas, yCanvas);
                this.x = 0;
                this.y = 0;
                this.drawingSignature = false;
            }
            this.increaseCount = false;
        })        

        document.getElementById('effacer').addEventListener('click', (e) => {
            e.preventDefault();
            this.clearCanvas();
            this.count = 0;
        })
    }

    eventListennerTactile(){ 
        this.myCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.limitCanvas = this.myCanvas.getBoundingClientRect();
            this.drawingSignature = true;
            this.x = e.touches[0].clientX - this.limitCanvas.left;
            this.y = e.touches[0].clientY - this.limitCanvas.top;
            this.increaseCount = true;
        })

        this.myCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.drawingSignature === true) {
                let xCanvas = e.touches[0].clientX - this.limitCanvas.left;
                let yCanvas = e.touches[0].clientY - this.limitCanvas.top;
                this.draw(this.x, this.y, xCanvas, yCanvas);
                this.x = xCanvas;
                this.y = yCanvas;
                if (this.increaseCount === true){
                    this.count++;
                } 
            }
        })

        this.myCanvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.drawingSignature === true) {
                let xCanvas = e.changedTouches[0].clientX - this.limitCanvas.left;
                let yCanvas = e.changedTouches[0].clientY - this.limitCanvas.top;
                this.draw(this.x, this.y, xCanvas, yCanvas);
                this.x = 0;
                this.y = 0;
                this.drawingSignature = false;
            }
            this.increaseCount = false;
        })       

        document.getElementById('effacer').addEventListener('click', () => {
            console.log("okkkk");
            this.clearCanvas();
            this.count = 0;
        })   
        
    }

    draw(xDepart, yDepart, xFin, yFin) {
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 4;
        this.context.moveTo(xDepart, yDepart);
        this.context.lineTo(xFin , yFin);
        this.context.stroke();
        this.context.closePath();
     }
   
     clearCanvas(){
         this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
     }

}