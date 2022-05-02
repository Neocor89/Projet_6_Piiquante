const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(10) 
  .is()
  .max(64)  
  .has()
  .uppercase() 
  .has()
  .lowercase()  
  .has()
  .digits()  
  .has()
  .not()
  .spaces();  

module.exports = passwordSchema;

//: Mote de passe ayant une longueur minimun de 10 caractères maximum : 64 
//: Doit également avoir au moins une majuscule et une minuscule, un chiffre 
//: Et ne doit pas avoir d'espaces