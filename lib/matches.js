
'use strict';

function match(leftvalue, rightvalue, ctx) {
    if (leftvalue === rightvalue)
        return true;
        
    if (typeof leftvalue === 'string')
        return false;
        
    if (leftvalue.match)
        return leftvalue.match(rightvalue, ctx);
    
    return false;
}

module.exports = {
    match: match
}