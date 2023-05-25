
import { storageService } from "./async-objectMapStorage.service";
import { storageStuff } from "./storage-service";

const STORAGE_KEY = 'words'

export const wordService = {
    query,
    getEmptyWord,
    createWord,
    remove,
    save,
    clearHistory,
    getByKey,
    getEmptyWordItems,
    getEmptyWordImg,
    getEmptyWordCanvas
}

// storageMap['hello'] = {trans:'שלום',options:[1,2,3], date: new Date(), word:'hello'}

// a way to check if an object is empty -> Object.keys(obj).length
async function query(filterBy) {
    const storageWords = await storageService.query(STORAGE_KEY)
    let words = storageWords
    if (!Object.keys(words).length) {
        _saveItemsToStorage(words)
    }
    return Promise.resolve(words)
}

async function save(word) {
    if (word._id) {
        console.log('word update', word);
        return storageService.put(STORAGE_KEY, word)
    } else {
        console.log('word save', word);
        return storageService.post(STORAGE_KEY, word)
    }

}

async function remove(wordKey) {
    return storageService.remove(STORAGE_KEY, wordKey)
}

async function getByKey(wordKey) {
    return storageService.get(STORAGE_KEY, wordKey)
}



async function clearHistory() {
    return await storageService.clear(STORAGE_KEY)
}

function getEmptyWord() {
    return { trans: '', options: [], date: new Date(), wordToTrans: '' }
}

function getEmptyWordItems() {
    return {
        type: 'items',
        items: [],
        txt: '',
        color: '#ffffff'
    }
}

function getEmptyWordImg() {
    return {
        type: 'img',
        imgUrl: '',
        txt: '',
        color: '#ffffff'
    }
}

function getEmptyWordCanvas() {
    return {
        type: 'canvas',
        imgUrl: '',
        dataUrl: '',
        txt: '',
        color: '#ffffff'
    }
}

function createWord({ searchWord }) {
    return {
        searchWord: ''
    }
}


function _saveItemsToStorage(items) {
    storageStuff.saveToStorage(STORAGE_KEY, items)
}




