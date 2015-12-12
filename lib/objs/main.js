

function length(obj) {
    return obj.length;
}

function is_boolean(obj) {
    if (obj == null)
        return false;
        
    if (obj === false || obj === true)
        return true;
    
    if (typeof obj.isAtom === 'function' && obj.isAtom()) {
        var name = obj.name();
        
        return name === 'false' || name === 'true';
    }
    
    return false;
}

function is_atom(obj) {
    if (obj == null)
        return false;
        
    if (typeof obj.isAtom === 'function')
        return obj.isAtom();
        
    return obj === false || obj === true;
}

module.exports = {
    length: length,
    is_boolean: is_boolean,
    is_atom: is_atom
}