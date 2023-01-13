import './style.css'
import SplitType from 'split-type'

let text
let selector = 'h2'

function calcWidthLine() {

  console.log(`${selector} .line`)

  let lines = document.querySelectorAll(`h2 .line`)
  let linesLength = lines.length

  function calcWidthLine(line) {
    let words = line.querySelectorAll(".word")
    let width = 0

    words.forEach(element => {
        width += element.offsetWidth
    })

    return width
  }

  for(let i = 0 ; i < linesLength; i++) {
    if(i == 0 || calcWidthLine(lines[i]) < calcWidthLine(lines[i-1]) && calcWidthLine(lines[i-1]) - calcWidthLine(lines[i]) > 10) {
      lines[i].classList.add('eT')
    } 
    else {
      lines[i].classList.add('iT')
    }
    
    //next
    if(i+1 == linesLength) {
      lines[i].classList.add('iB')
    } else {
      if(calcWidthLine(lines[i]) < calcWidthLine(lines[i+1]) && calcWidthLine(lines[i+1]) - calcWidthLine(lines[i]) > 10 ) {
        lines[i].classList.add('eB')
      } 
      else {
        lines[i].classList.add('iB')
      }
    }

  }
}

document.fonts.load("14px Mona Sans").then(() => {
  text = new SplitType(selector, { types: 'lines, words' })
  calcWidthLine()
  /* new SplitType(text.lines, { types: 'lines', lineClass: 'line_inner' }) */
})

window.addEventListener('resize', () => {
  text.revert()
  text = new SplitType(selector, { types: 'lines, words' })
  calcWidthLine()
  /* new SplitType(text.lines, { types: 'lines', lineClass: 'line_inner' }) */
})
