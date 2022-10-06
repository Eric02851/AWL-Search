import awl from './AWL.json' assert {type: 'json'}

const main = () => {
    const sublists = document.querySelectorAll('input[type="checkbox"]')
    let checked = []
    for (let i of sublists) {
        if (i.checked)
            checked.push(i.value)
    }

    let lookupDict = {}
    for (let i of checked) {
        for (let j of awl[i].presentSingular) lookupDict[j] = true
        for (let j of awl[i].plural) lookupDict[j] = true
        for (let j of awl[i].pastTense) lookupDict[j] = true
    }

    let paper = document.getElementById("paper").value.trim()
    paper = paper.replace(/[^A-Za-z\s]/g, '')
    paper = paper.split(/\s+/);

    let wordsFound = []
    for (let i of paper)
        if (lookupDict[i]) wordsFound.push(i)

    console.log(Array.from(new Set(wordsFound)))
}

document.querySelector('input[type="button"]').addEventListener('click', main)
