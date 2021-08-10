//const Space = require('./Space.js') ;
const express = require('express');
const Space = require('./spaces/Parking.js');
const app = express();


const parking = []; // esta es la lista del parqueo
const reservations = []; // lista de los carros en el parqueo

const Spaces = ( function() {
  var count = 1;

    return function Space(infospace) {
        this.id = count;
        this.state = 'free';
        this.infospace = infospace;
        count++;
   }
})();


// prueba de export
// var count = 0;
// class Spaces {
//   struct(infospace) {
//     this.id = count++;
//     this.state = 'free';
//     this.infospace = infospace;
//     count++;
//   }
// }

var Reservation = (function() {
    return function Space(id, plate,time) {
        this.id = id;
        this.plate = plate;
        this.time = time
   }
})();



app.get('/spaces', (req, res) => {
    if (parking.length === 0) return res.status(404).send('No se han creado espacios');
    return res.send(parking);


});

app.get('/spaces/state', (req, res) => {
    if (parking.length === 0) return res.status(404).send('No se han creado espacios');
    const tempList = [];
    const dms = parking.length;
    for (let i = 0; i < dms;i++ ) {
       // if (value === "state") {
        tempList.push(parking[i].state);    
        //}
        
    }
    //parking.forEach(element => tempList.push(element.values().state));
    return res.send(tempList);


});

app.get('/spaces/:id', (req, res) => {
    const place = parking.find(c => c.id === parseInt(req.params.id));
    if (!place) return res.status(404).send('No existe un campo con ese id');
    return res.send(place);

});

app.post('/spaces/', (req, res) => {
    //const spaces = new Space();
    
   // var newSpace = new spaces(req.query.infospace)
    var newSpace = new Spaces(req.query.infospace)
    parking.push(newSpace);
    return res.send(parking); // Cambiar a mensaje de ok

});

app.put('/spaces/:id', (req, res) => {
    const place = parking.find(c => c.id === parseInt(req.params.id));
    if (!place )  return res.status(404).send('No existe un campo con ese ID');
    palce.state = req.query.state;
    place.infospace = req.query.infospace;
  res.satatus(200).send('Se Actualizo el espacio correctamente'); 
  
            
    
    
});


app.delete('/spaces/:id', (req, res) => {
    const place = parking.find(p => p.id === parseInt(req.params.id));
    if (!place) return res.status(404).send('No existe campo con ese ID');
    const carr = reservations.find(c => c.id === parseInt(req.params.id));
    if(carr) return res.status(302).send('Hay un vehiculo en ese espacio'); // ESTATUS 302 FOUND
    const index = parking.indexOf(place);
    parking.splice(index, 1);
    res.satatus(200).send('Se elimino el espacio correctamente'); 
});

app.post('/reservations', (req, res) => {
    const emptyPlace = parking.find(p => p.state === 'free');
    if (!emptyPlace) return res.status(404).send('No hay espacios disponibles');
    let tempTime = new Date();
    let time = tempTime.getHours() + ":" + tempTime.getMinutes();
    if (!req.query.plate) return res.status(404).send('Por favor agregar una placa');
    emptyPlace.state = 'in-use';
    const vehicle = new Reservation(emptyPlace.id, req.query.plate,  time);
    reservations.push(vehicle);
    return res.send(reservations); // cambiar mensaje a ok

});

app.get('/reservations', (req, res) => {
    if (reservations.length === 0) return res.status(404).send('No hay carros en el parqueo');
    return res.send(reservations);


});

app.delete('/reservations/:id', (req, res) => {
    const delreservation = reservations.find(p => p.id === parseInt(req.params.id));
    if (!delreservation) return res.status(404).send('No existe campo con ese ID');
    const index = reservations.indexOf(delreservation);
    reservations.splice(index, 1);
    res.send(reservations); // cambiar mensaje a ok
});

app.listen(3000, () => console.log("Listening on port 3000"));
