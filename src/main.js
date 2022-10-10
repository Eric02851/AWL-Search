import awl from './AWL.json' assert {type: 'json'}
const sublists = document.querySelectorAll('input[type="checkbox"]')

const searchPaper = () => {
    const wordCount = document.getElementById('wordCount')
    const wordsOut = document.getElementById('wordsFound')
    let paper = document.getElementById('paper')

    paper = paper.value.trim().toLowerCase()
    paper = paper.replace(/[^A-Za-z\s]/g, '')
    paper = paper.split(/\s+/)

    if (paper.length == 1 && paper[0] == '') {
        wordsOut.textContent = ""
        wordCount.style = 'color:red'
        wordCount.textContent = ' (Paper Not Entered)'
        return
    }

    let checked = []
    for (let i of sublists)
        if (i.checked) checked.push(i.value)

    if (checked.length == 0) {
        wordsOut.textContent = ""
        wordCount.style = 'color:red'
        wordCount.textContent = ' (No Sublists Selected)'
        return
    }

    let lookupDict = {}
    for (let i of checked) {
        for (let j of awl[i].presentSingular) lookupDict[j] = true
        for (let j of awl[i].plural) lookupDict[j] = true
        for (let j of awl[i].pastTense) lookupDict[j] = true
    }

    let wordsFound = []
    for (let i of paper) if (lookupDict[i]) wordsFound.push(i)
    wordsFound = Array.from(new Set(wordsFound))

    let wordStr = ''
    for (let i of wordsFound) wordStr += i + ', '
    wordStr = wordStr.slice(0, wordStr.length - 2)
    wordsOut.textContent = wordStr

    if (wordsFound.length != 0) wordCount.style = 'color:green;'
    else wordCount.style = 'color:red'
    wordCount.textContent = ` (${wordsFound.length})`

    console.log(lookupDict)
    console.log(paper)
    console.log(wordsFound)
}

document.getElementById('selectButton').addEventListener('click', function() {for (let i of sublists) i.checked = true})
document.getElementById('deselectButton').addEventListener('click', function() {for (let i of sublists) i.checked = false})
document.getElementById('searchButton').addEventListener('click', searchPaper)
