const gameBoard=document.getElementById("gameBoard")
const info=document.getElementById("info")

const squares=["","","","","","","","",""]

function createBoard(){
    squares.forEach((_square, index) => {
        const cellElement= document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id=index
        cellElement.addEventListener("click",addGo)
        gameBoard.append(cellElement)
    })
}
let clicked='cross'
info.textContent=`Square Goes First`
info.style.color="white"

createBoard()

function addGo(event){
    const itemDisplay=document.createElement('div')
    itemDisplay.classList.add(clicked)
    event.target.append(itemDisplay)
    clicked=clicked==="circle"? "cross":"circle"
    info.textContent=`Now ${clicked}'s chance`
    event.target.removeEventListener("click",addGo)
    checkScore()
}

function checkScore(){
    const allSquares=document.querySelectorAll(".square")
    const winningCombos=[
        [0,1,2],[3,4,5],[6,7,8],
        [1,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    winningCombos.forEach(_array=>{
       const circleWins= _array.every(cell=>  allSquares[cell].firstChild?.classList.contains("circle") )
       if(circleWins){
            info.textContent="Circle  Wins!"         
            allSquares.forEach(square=> square.replaceWith(square.cloneNode(true)))
            alert("Circle  Wins!")
            return
       }
    })

    winningCombos.forEach(_array=>{
        const crossWins= _array.every(cell=>  allSquares[cell].firstChild?.classList.contains("cross") )
        if(crossWins){
             info.textContent="square Wins!"            
             allSquares.forEach(square=> square.replaceWith(square.cloneNode(true)))
             alert("square Wins!")
             return
        }
     })
}