
const matches = require('./matches');

function List(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
    this.length = function () { return tail ? 1 + tail.length() : 1; };
    this.get = function (n) { return n == 0 ? head : tail.get(n - 1); };
    
    this.match = function (value, ctx) {
        if (value == null)
            return null;
            
        if (!value.isList || !value.isList())
            return null;
            
        if (!matches.match(head, value.head(), ctx))
            return null;
            
        if (tail == null && value.tail() == null)
            return value;
            
        if (matches.match(tail, value.tail(), ctx) != null)
            return value;
        else
            return null;
    }
    
    this.toArray = function () {
        if (tail == null)
            return [head];
            
        var result = tail.toArray();
        result.unshift(head);
        
        return result;
    }
    
    this.toString = function () {
        let result = "[";
        
        let h = head;
        let t = tail;
        
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
    
    this.subtract = function (list) {
        const values = this.toArray();
        const svalues = list.toArray();
        
        const result = [];
        
        values.forEach(function (value) {
            var p = svalues.indexOf(value);
            
            if (p < 0)
                result.push(value);
            else
                delete svalues[p];
        });
        
        return createListFromArray(result);
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
EmptyList.prototype.toArray = function () { return []; };

var emptyl = new EmptyList();

function createList(head, tail) {
    if (head == undefined)
        return emptyl;
        
    return new List(head, tail);
}

function createListFromArray(items) {
    if (!items || !items.length)
        return emptyl;
        
    let list = null;
    
    for (var k = items.length; k--;)
        list = new List(items[k], list);
        
    return list;
}

module.exports = {
    list: createList,
    create: createListFromArray
};

