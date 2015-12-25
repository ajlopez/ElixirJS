

function length(obj) {
    if (typeof obj.length === 'function')
        return obj.length();
        
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

function is_list(obj) {
    if (obj == null)
        return false;
        
    if (typeof obj.isList === 'function')
        return obj.isList();
        
    return false;
}

function is_tuple(obj) {
    if (obj == null)
        return false;
        
    if (typeof obj.isTuple === 'function')
        return obj.isTuple();
        
    return false;
}

function is_number(obj) {
    if (obj == null)
        return false;
        
    return typeof obj === 'number';
}

function is_integer(obj) {
    if (obj == null || typeof obj !== 'number')
        return false;
        
    return obj.toString().indexOf('.') < 0;
}

function is_nil(obj) {
    return obj == null;
}

module.exports = {
    length: length,
    is_boolean: is_boolean,
    is_atom: is_atom,
    is_number: is_number,
    is_integer: is_integer,
    is_list: is_list,
    is_tuple: is_tuple,
    is_nil: is_nil
}

