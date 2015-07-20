
function List(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
    this.length = function () { return tail ? 1 + tail.length() : 1; };
}

function EmptyList(head, tail) {
    this.length = function () { return 0; };
}

function createList(head, tail) {
    if (head == undefined)
        return new EmptyList();
        
    return new List(head, tail);
}

module.exports = {
    list: createList
};