//const Space = require('./Space.js') ;
var express = require('express');
var app = express.Router();

const { Space } = require('./Parking/parking.js');
const { Reservation } = require('./Parking/parking.js');

app.use(express.json());


const parking = []; // esta es la lista del parqueo
const reservations = []; // lista de los carros en el parqueo






app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");   
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-type,Accept,X-Access-Token,X-Key");   
    if (req.method==='GET' || req.method==='DELETE'){
        next();  
    }
    else if (req.get('Content-Type')=== 'application/json'){       
        next();   
    }else{       
        res.status(405).send(req.get('Content-Type'))   
    } 

});

app.get('/spaces', (req, res) => {
    if (parking.length === 0) return res.status(404).json({ error: 'No se han creado espacios' });
    const dms = parking.length;
    let spacetemp = [];
    if (req.query.state === 'free') {
        for (let i = 0; i < dms; i++) {
            if (parking[i].state === 'free') {
            spacetemp.push(parking[i]);        
            }
            
        
        }
        return res.json(spacetemp);
    } else if (req.query.state === 'in-use') {
        for (let i = 0; i < dms; i++) {
            if (parking[i].state === 'in-use') {
            spacetemp.push(parking[i]);        
            }
            
        
        }
        return res.json(spacetemp);
    }
    return res.json(parking);


});


app.get('/spaces/state', (req, res) => {
    if (parking.length === 0) return res.status(404).json({ error: 'No hay vehiculos' });
    const tempList = [];
    const dms = parking.length;
    for (let i = 0; i < dms;i++ ) {
        tempList.push(parking[i].state);    
        
    }
    return res.json(tempList);


});

app.get('/spaces/:id', (req, res) => {
    const place = parking.find(c => c.id === parseInt(req.params.id));
    if (!place) return res.status(404).json({ error: 'No existe un campo con ese id' });
    return res.json(place);

});


app.post('/spaces/', (req, res) => {
    if (!req.query.infospace) return res.status(404).json({error:'Por favor agregar un detalle del espacio'});
    var newSpace = new Space(req.query.infospace);
    parking.push(newSpace);
    //return res.json(parking); // Cambiar a mensaje de ok
    res.status(200).json("El espacio se actualizo correctamente");
});

app.put('/spaces/:id', (req, res) => {
    const place = parking.find(c => c.id === parseInt(req.params.id));
    if (!place) return res.status(404).json({ error: 'No existe un campo con ese ID' });
    place.infospace = req.query.infospace;
    
    //res.json(parking);
    res.status(200).json("El espacio se actualizo correctamente");
            
    
});


app.delete('/spaces/:id', (req, res) => {
    const place = parking.find(p => p.id === parseInt(req.params.id));
    if (!place) return res.status(404).json({ error: 'No existe campo con ese ID' });
    const carr = reservations.find(c => c.id === parseInt(req.params.id));
    if (carr) return res.status(302).json({error : 'Hay un vehiculo en ese espacio'}); // ESTATUS 302 FOUND
    const index = parking.indexOf(place);
    parking.splice(index, 1);
    res.satatus(200).json('Se elimino el espacio correctamente'); 
    //res.json(parking);
});




app.post('/reservations', (req, res) => {
    const emptyPlace = parking.find(p => p.state === 'free');
    if (!emptyPlace) return res.status(404).json({ error: 'No hay espacios disponibles' });
    let tempTime = new Date();
    let time = tempTime.getHours() + ":" + tempTime.getMinutes();
    if (!req.query.plate) return res.status(404).json({ error: 'Por favor agregar una placa' });
    emptyPlace.state = 'in-use';
    const vehicle = new Reservation(emptyPlace.id, req.query.plate,  time);
    reservations.push(vehicle);
    //return res.json(reservations); // cambiar mensaje a ok
    return res.status(200).json("Se reservo correctamente")

});

app.get('/reservations', (req, res) => {
    if (reservations.length === 0) return res.status(404).json({ error: ' No hay carros en el parqueo' });
    return res.json(reservations);


});

app.delete('/reservations/:id', (req, res) => {
    const delreservation = reservations.find(p => p.id === parseInt(req.params.id));
    if (!delreservation) return res.status(404).json({ error: 'No existe campo con ese ID' });
    const index = reservations.indexOf(delreservation);
    reservations.splice(index, 1);
    const changestate = parking.find(p => p.id === delreservation.id);
    changestate.state = 'free';
    //res.json(reservations); // cambiar mensaje a ok
    res.status(200).json("Se elimino correctamente la reserva")
});

module.exports = app;
