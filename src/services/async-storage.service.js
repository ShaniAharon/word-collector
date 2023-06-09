
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    clear
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function postMany(entityType, newEntites) {
    return query(entityType)
        .then(entities => {
            entities.push(...newEntites)
            _save(entityType, entities)
            return newEntites
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function clear(entityType) {
    return query(entityType)
        .then(entities => {
            entities.splice(0, entities.length)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
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

