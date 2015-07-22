

function Context() {
    var values = {};
    
    this.get = function (name) { return values[name]; };
    
    this.set = function (name, value) {
        values[name] = value;
    };
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
}