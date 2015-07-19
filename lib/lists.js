
function List(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
    this.length = function () { return tail ? 1 + tail.length() : 1; };
}

function createList(head, tail) {
    return new List(head, tail);
}

module.exports = {
    list: createList
};