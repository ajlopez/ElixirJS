
'use strict';

function match(leftvalue, rightvalue, ctx) {
    if (leftvalue === rightvalue)
        return rightvalue;
        
    if (typeof leftvalue === 'string')
        return null;
        
    if (leftvalue.match)
        return leftvalue.match(rightvalue, ctx);
    
    return null;
}

module.exports = {
    match: match
}