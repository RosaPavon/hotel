const express = require("express");
const router = express.Router()

app.get("/registro", function (req, res) {
  db.collection("clientes").find().toArray(function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    });
});

//ponemos router en vez de app("ruta")
router.post('/registro'),function(req,res){
let db= req.app.locals.db
//antes de crear un usuario debemos averiguar si existe ya 
db.collection("clientes").find({dni:req.body.dni}.toArray(
function (err, data) {
    if (err) {
        console.log(error);
        res.send({ error: true, mensaje: error });
      } else {
        if(datos.lenght == 0){//si es mayor que 0 quiere decir que ya está registrado
          req.app.locals.db.collection("clientes").inserOne(req.body, function(err,data){
            if(err){
              console.log(error);
              res.send({ error: true, mensaje: error });
            }else{
              console.log(error);
          res.send({ error: false, contenido: {mensaje: "Usuario registrado" }});
            }
          })

        }else{
          console.log(error);
          res.send({ error: false, contenido: {mensaje: "Usuario ya registrado" }});
  
        }
        res.send({ error: false, mensaje: data });
      }
})
);
};
router.put("/editar", function (req, res) {
    let db= req.app.locals.db
    let nombre=req.body.nombre
    let apellido=req.body.apellido
    let dni=req.body.dni
    db.collection("clientes").updateOne({ dni:dni },//buscamos el dni para cambiar solo ese
      { $set: { nombre: nombre, apellido: apellido} },
      function (error, datos) {
        if (error !== null) {
          console.log(error);
          res.send({ mensaje: "Ha habido un error" + error });
        } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
          if(datos.matcheCount !=1 ){
          if(datos.modifiedCount==1){
            res.send({error:false, mensaje:"Usuario actualizado"})

          }else{
            res.send({error:false, mensaje:"no se ha podido actualizar"})

          }
        }else{
          res.send({error:false, mensaje:"Usuario no encontrado"})
        }
        }
      }
    );
  });

  app.get("/registro", function (req, res) {
    db.collection("clientes")
      .find({ titulo: {$regex:' ${req.query.dni2}'}})//se usa el query porque viene de un formulario
      .toArray(function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos })
      })
  })

module.exports = router