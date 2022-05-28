document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    fetchWord()
})

function fetchWord() {

    clearTable()
    
    let inputWord = document.querySelector('input').value
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            getAudio(Array.from(data[0].phonetics))
            displayWord(data)
            createHeader()
            displayMeanings(Array.from(data[0].meanings))
            showTable()
        })

    function displayWord(data) {
        let word = data[0].word
        document.querySelector('.displayWord').innerText = word[0].toUpperCase() + word.slice(1)

    }
    function getAudio(phonetics) {
        if (phonetics.length === 0) {
            document.querySelector('.phonetic').innerText = ''
            return
        }
        else {

            phonetics.forEach(e => {

                for (let keys in e) {

                    if (keys === 'text' && e[keys] !== '') {
                        document.querySelector('.phonetic').innerText = e[keys].replaceAll('/', '')
                    }

                    if (keys === 'audio' && e[keys] !== '') {
                        document.querySelector('audio').src = e[keys]
                        break;
                    }
                }
            })
        }
    }
    function clearTable() {
        document.querySelector('audio').src = ''
        document.querySelector('tbody').innerText = ''
        document.querySelector('table').classList.add('hidden')
        document.querySelector('.wordSection').classList.add('hidden')
    }
    function createHeader() {
        let newRow = document.createElement('tr')
        for (let i = 0; i < 3; i++) {
            let tableH = document.createElement('th')
            if (i == 0) tableH.appendChild(document.createTextNode('Part Of Speech'))
            else if (i === 1) tableH.appendChild(document.createTextNode('Definition'))
            else if (i === 2) tableH.appendChild(document.createTextNode('Synonyms'))
            newRow.appendChild(tableH)
        }
        document.querySelector('tbody').appendChild(newRow)
    }
    function displayMeanings(meanings) {
        meanings.forEach((e) => {
            let partOfSpeech = e.partOfSpeech //word
            let definitions = e.definitions.map(obj => obj.definition) //array
            let synonyms = e.synonyms //array
            let cellData, newCell;

            let newRow = document.createElement('tr')

            for (let i = 0; i < 3; i++) {

                newCell = document.createElement('td')

                if (i === 0) cellData = document.createTextNode(partOfSpeech)
                if (i === 1) cellData = createList(definitions)
                if (i === 2) cellData = createList(synonyms)

                newCell.appendChild(cellData)
                newRow.appendChild(newCell)

            }

            document.querySelector('tbody').appendChild(newRow)
        })
    }
    function showTable() {
        if (document.querySelector('audio').getAttribute('src') === '') {
            document.querySelector('audio').classList.add('hidden')
        } else {
            document.querySelector('audio').classList.remove('hidden')
        }
        document.querySelector('.wordSection').classList.remove('hidden')
        document.querySelector('table').classList.remove('hidden')
    }
    function createList(array) {
        let list = document.createElement('ul')

        array.forEach(e => {
            let listItem = document.createElement('li')
            let listTextNode = document.createTextNode(e)

            listItem.appendChild(listTextNode)
            list.appendChild(listItem)
        })

        return list
    }
}