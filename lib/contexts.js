

function Context() {
    this.get = function (name) { return undefined; };
}

function createContext() {
    return new Context();
}

module.exports = {
    context: createContext
}