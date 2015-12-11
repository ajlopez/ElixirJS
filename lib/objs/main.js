

function length(obj) {
    return obj.length;
}

function is_boolean(obj) {
    return obj === false || obj === true;
}

module.exports = {
    length: length,
    is_boolean: is_boolean
}