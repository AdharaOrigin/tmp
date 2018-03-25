'use strict'


function newsGoes(resolve) {
  setTimeout(() => {
    console.log("That's the waaaaay... the news goes.")
    resolve(42)
  }, 2000)
}

function newsGoesPromised(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("That's the waaaaay... the news goes.")
      if (x === 42)
        resolve(69)
      else
        reject(0)
    }, 2000)
  })
}

async function newsGoesAsync(x) {
  console.log("That's the waaaaay... the news goes.")
  if (x === 42)
    return 69
  else
    throw 0;
}

console.log("Hello, World!")

/*
// newsGoesPromised(1).then(value => {
newsGoesAsync(420).then(value => {
  console.log("The answer is: " + value)
}).catch(value => {
  console.log("Bitch: " + value)
})
*/


function delayed(msg, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg)
      resolve(time)
    }, time)
  })
}

async function bitch() {
  console.log("Let's go!")
  // await delayed("Hello", 2000)
  // await delayed("Bitch", 2000)
  // Waits sequentionally: console.log(await delayed("Hello", 1000) + await delayed("Bitch", 1000))

  let a = delayed("Hello", 2000)
  let b = delayed("Bitch", 2000)
  console.log(await a + await b)
  console.log("Done!")
}
// bitch()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let foo = {
  x: 0,
  y: 0,

  init: async function init(first, second) {
    await sleep(2000);
    this.x = first
    this.y = second
    document.addEventListener('click', () => {
      console.log(foo.x + ':' + foo.y)
    })
  }
}

// foo.init(42, 69)

const obj = {
  x: 1,
  y: 2,
  z: 3,

  print: function print() {
    console.log("x: " + this.x + " y: " + this.y + " z: " + this.z)
  }
}

function scale(object) {
  Object.keys(object).forEach((i) => {
    if (i !== "print")
      object[i] = 2*object[i]
  })
}

function scaleVariable(x) {
  x = 2*x
}

const bla = {
  data: 0,
  ready: new Promise()
}



// obj.print()
// scale(obj)
// obj.print()

// let x = 6
// console.log(x)
// scaleVariable(x)
// console.log(x)



// Not so useful. Call newsGoes directly, return Promise from it
/*
const promise = new Promise(resolve => {
  newsGoes(resolve)
})

promise.then((value) => {
  console.log("The answer is: " + value)
})
*/

/*
function foo(x) {
  console.log(x+x)
}

function baz(func, arg) {
  func(arg)
}

let x = 42
baz(foo, x)
*/
