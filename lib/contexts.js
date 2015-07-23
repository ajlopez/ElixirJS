

function Context(parent) {
    var values = {};
    
    this.get = function (name) { 
        if (values[name] === undefined && parent)
            return parent.get(name);
            
        return values[name]; 
    };
    
    this.set = function (name, value) {
        values[name] = value;
    };
}

function createContext(parent) {
    return new Context(parent);
}

module.exports = {
    context: createContext
}