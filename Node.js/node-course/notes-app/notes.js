const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => { 
    return 'Your notes...' 
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => notes.title === title)

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title)=> {
    const notes = loadNotes()
    const noteToRemove = notes.filter((notes) =>notes.title === title)
    const noteToKeep = notes.filter((notes) => notes.title !== title)


    if(noteToKeep.length === 0 && noteToRemove.length === 0){
        console.log(chalk.red.inverse('Note file empty'))
    }
    else if(noteToRemove.length === 0){
        console.log(chalk.red.inverse('Note does not exist'))
    } else {
        saveNotes(noteToKeep)
        console.log(chalk.green.inverse('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.cyan.inverse("Your notes"))
    notes.forEach((note) => {
        console.log(note.title)
    })

}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((noteFound) => noteFound.title === title)

    if(noteFound){
        console.log(chalk.cyan(noteFound.title))
        console.log(noteFound.body)
    } else {
        console.log(chalk.red("No note found"))
    }

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}