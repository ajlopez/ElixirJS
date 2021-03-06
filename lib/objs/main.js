

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

    return Math.floor(obj) === obj;
}

function is_float(obj) {
    if (obj == null || typeof obj !== 'number')
        return false;

    return Math.floor(obj) !== obj;
}

function is_nil(obj) {
    return obj == null;
}

function tuple_size(tuple) {
    return tuple.size();
}

function elem(tuple, n) {
    return tuple.get(n);
}

function hd(list) {
    return list.head();
}

function tl(list) {
    return list.tail();
}

function rem(x, y) {
    return x % y;
}

module.exports = {
    length: length,
    
    // see http://elixir-lang.org/getting-started/case-cond-and-if.html
    is_atom: is_atom,
    is_boolean: is_boolean,
    is_float: is_float,
    // is_function
    is_integer: is_integer,
    is_list: is_list,
    // is_map
    is_nil: is_nil,
    is_number: is_number,
    // is_reference
    is_tuple: is_tuple,
    
    abs: Math.abs,
    rem: rem,
    
    tuple_size: tuple_size,
    elem: elem,
    
    hd: hd,
    tl: tl
}

