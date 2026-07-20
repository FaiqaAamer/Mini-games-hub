const words = ["javascript", "react", "learn", "helloworld"]
let selectedWord = words[Math.floor(Math.random() * words.length)]
let correctGuess = []
let wrongGuess = 0

const wordDisplay = document.getElementById("wordDisplay")
const message = document.getElementById("message")
const keyboard = document.getElementById("keyboard")
const canvas = document.getElementById("hangmanCanvas")
const ctx = canvas.getContext('2d')