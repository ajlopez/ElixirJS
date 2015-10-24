
var matches = require('./matches');

function List(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
    this.length = function () { return tail ? 1 + tail.length() : 1; };
    this.get = function (n) { return n == 0 ? head : tail.get(n - 1); };
    
    this.match = function (value, ctx) {
        if (value == null)
            return false;
            
        if (!value.isList || !value.isList())
            return false;
            
        if (!matches.match(head, value.head(), ctx))
            return false;
            
        return matches.match(tail, value.tail(), ctx);
    }
    
    this.toArray = function () {
        if (tail == null)
            return [head];
            
        var result = tail.toArray();
        result.unshift(head);
        
        return result;
    }
    
    this.toString = function () {
        var result = "[";
        
        var h = head;
        var t = tail;
        
        result += " " + head.toString();
        
        while (t != null) {
            h = t.head();
            t = t.tail();
            
            result += ", " + h.toString();
        }
        
        result += " ]";
        
        return result;
    }
    
    this.append = function (list) {
        if (tail)
            return new List(head, tail.append(list));
            
        return new List(head, list);
    }
}

List.prototype.isAtom = function () { return false; }
List.prototype.isVariable = function () { return false; }
List.prototype.isList = function () { return true; }
List.prototype.isTuple = function () { return false; }

function EmptyList(head, tail) {
    this.length = function () { return 0; };
}

EmptyList.prototype.isAtom = function () { return false; };
EmptyList.prototype.isVariable = function () { return false; };
EmptyList.prototype.isList = function () { return true; };
EmptyList.prototype.isTuple = function () { return false; };

EmptyList.prototype.append = function (list) { return list; };

EmptyList.prototype.toString = function () { return "[]" };

var emptyl = new EmptyList();

function createList(head, tail) {
    if (head == undefined)
        return emptyl;
        
    return new List(head, tail);
}

function createListFromArray(items) {
    if (!items || !items.length)
        return emptyl;
        
    var list = null;
    
    for (var k = items.length; k--;)
        list = new List(items[k], list);
        
    return list;
}

module.exports = {
    list: createList,
    create: createListFromArray
};

