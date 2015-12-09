

function reverse(obj) {
    return obj.slice().reverse();
}

function memberp(obj, elem) {
    return obj.indexOf(elem) >= 0;
}

module.exports = {
    reverse: reverse,
    "member?": memberp
}