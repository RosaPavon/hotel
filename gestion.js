const express = require("express");
const router = express.Router()

router.post("/checkin", function(req,res){
    app.locals.db.collection("clientes").find({dni:req.body.dni}).tArray(function(error,data){
        if(error){
            res.send({error:true, contenido: error})
        }else{
            if(data.lenght == 1){
                //ya hemos comprobado que este registrado, ahora vemos si la habitacion esta disponible
                app.locals.db.collection("habitaciones").find({room:req.body.room}).toArray(function(error, data){
                    if(error){
                        res.send({error:true, contenido: error})//en este caso no ha encontrado la habitación
                    }else{
                        //ahora debemos comprobar si esta libre o no
                        if(data.lenght == 1){//ha encontrado habitacion
                            if(data[0].disponible){//ponemos indice 0 porque es el primero que nos va a llegar como respuesta
                               //si esta disponible la añadimos a la coleccion revervas
                               app.locals.db.collection("reservas").insertOne({dni:req.body.dni,room:req.body.room, in:req.body.in,activa:true, out:req.body.out},function(error,data){
                                   if(error){
                                       res.send({error:true, contenido:error})
                                   }else{
                                       res.send({error:false, contenido:{mensaje:"Reserva realizada",respuesta:data}})
                                   }
                               } )
                            }else{
                                res.send({error:false, contenido:{mensaje:"Habitación no disponible", respuesta:data}})
                            }
                        }else{
                            res.send({error:false, contenido:{mensaje:"Habitación no encontrada", respuesta:data}})
                        }
                    }
                })
            }else{
                res.send({error:false, contenido:{mensaje:"Usuario no registrado ", respuesta:data}})
            }
        }

    })
})

//Ahora vamos a crear el checout
router.put("/checkout", function(req,res){
    app.locals.db.collection("reservas").find({dni:req.body.dni}).tArray(function(error,data){
        if(error){
            res.send({error:true, contenido: error})
        }else{
            if(data.lenght == 1){
                //ya hemos comprobado que el dni esté registrado, ahora vemos si la reserva esta realizada
                //primero vemos si esta disponible o no
                app.locals.db.collection("habitaciones").updateOne({room:room},{$set:{disponible:true}}).toArray(function(error,data){
                    if(error){
                        //ahora la reserva
                        app.locals.db.collection("reservas").updateOne({dni:dni},{$set:{out:req.body.fecha, activa:true}}).toArray(function(error,data){
                            if(error){
                                res.setDefaultEncoding({error:true, contenido:error})
                            }else{
                                res.send({error:false, contenido:{mensaje:"Check out realizado", respuesta:data}})
                            }
                        })
                        
                    }else{
                        
                        res.send({error:true, contenido:error})
                    }
                })
            }            
                res.send({error:false, contenido:{mensaje:"No hay reservas con ese DNI ", respuesta:data}})
            }
        

        })  
})

module.exports = router