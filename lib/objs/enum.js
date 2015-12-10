

function reverse(obj) {
    return obj.slice().reverse();
}

function memberp(obj, elem) {
    return obj.indexOf(elem) >= 0;
}

function join(obj, sep) {
    return obj.join(sep);
}

module.exports = {
    reverse: reverse,
    "member?": memberp,
    join: join
}