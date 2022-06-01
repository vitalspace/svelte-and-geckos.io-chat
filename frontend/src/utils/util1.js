// crea una funcion que debuelva un numero aleatorio entre 0 y el numero que se le pase como parametro
const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

console.log(getRandomNumber(10));