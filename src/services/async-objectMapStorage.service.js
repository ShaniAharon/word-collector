
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    clear
}

// const storageMap = {}
// storageMap['hello'] = {trans:'שלום',options:[1,2,3], date: new Date(), word:'hello'}
// if(!storageMap['hi'])storageMap['hi'] = {trans:'היי',options:[1,2,3]}
// !!storageMap['hello']
// const {trans} = storageMap['hello']

function query(entityType) {
    var entitiesMap = JSON.parse(localStorage.getItem(entityType)) || {} // contuine create caching for objectMap
    return Promise.resolve(entitiesMap) // { hebrew: translation }, {word: translation } ,{}
}

function get(entityType, entityKey) {
    entityKey = entityKey.toLowerCase()
    return query(entityType)
        .then(entitiesMap => entitiesMap[entityKey])
}

function post(entityType, newEntity) {
    // newEntity._id = _makeId()
    return query(entityType)
        .then(entitiesMap => {
            const key = newEntity.wordToTrans
            entitiesMap[key] = newEntity
            _save(entityType, entitiesMap)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entitiesMap => {
            const entityKey = updatedEntity.wordToTrans
            const oldEntity = entitiesMap[entityKey]
            entitiesMap[entityKey] = { ...oldEntity, ...updatedEntity }
            _save(entityType, entitiesMap)
            return updatedEntity
        })
}

function remove(entityType, entityKey) {
    return query(entityType)
        .then(entitiesMap => {
            const entityToRemove = entitiesMap[entityKey]
            if (!entityToRemove) throw new Error(`Unknown Entity ${entityKey}`)
            delete entitiesMap[entityKey]
            _save(entityType, entitiesMap)
        })
}

function clear(entityType) {
    return query(entityType)
        .then(entitiesMap => {
            entitiesMap.splice(0, entitiesMap.length)
            _save(entityType, entitiesMap)
        })
}

function _save(entityType, entitiesMap) {
    localStorage.setItem(entityType, JSON.stringify(entitiesMap))
}

// function _makeId(leng = 5) {
//     let id = '';
//     for (let i = 0; i < leng; i++) {
//         id += String.fromCharCode(Math.random() * (127 - 35) + 35);
//     }
//     return id;
// }

// _makeId function that generates an ID using only lowercase letters (a-z), uppercase letters (A-Z), and numbers (0-9)
function _makeId(leng = 5) {
    let id = '';

    for (let i = 0; i < leng; i++) {
        let charCode;
        do {
            charCode = Math.floor(Math.random() * (122 - 48 + 1)) + 48;
        } while (
            (charCode > 90 && charCode < 97) || // exclude characters between 'Z' and 'a'
            (charCode > 57 && charCode < 65)    // exclude characters between '9' and 'A'
        );
        id += String.fromCharCode(charCode);
    }

    return id;
}

