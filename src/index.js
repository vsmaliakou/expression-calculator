function eval() {
    // Do not use eval!!!
    return;
}

const getValue = (arr) => {
    let out  = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] !== '*' && arr[i] !== '/' && arr[i] !== '+' && arr[i] !== '-'){
            if(arr[i + 1] !== '*' && arr[i + 1] !== '/' && arr[i + 1] !== '+' && arr[i + 1] !== '-'){
                let b = arr.splice(i + 1, 1)
                out.push(arr[i] + b)
            } else {
                out.push(arr[i])
            }            
        } else {
            out.push(arr[i])
        }
    }
    for(let j = 0; j < out.length; j++){
        if(out[j] === '*'){
            let x = out.splice(j - 1, 1)
            let y = out.splice(j, 1)
            out[j - 1] = Number(x) * Number(y)
        } else if(out[j] === '/'){
            let x = out.splice(j - 1, 1)
            let y = out.splice(j, 1)
            out[j - 1] = Number(x) / Number(y)
        }
    }
    let sum = out[0];
    for(let k = 0; k < out.length; k++){        
        if(out[k] === '+'){
            sum += Number(out[k + 1])
        } else if(out[k] === '-'){
            sum -= Number(out[k + 1])
        }
    }
    return sum
}

function expressionCalculator(expr) {
    // write your solution here
    expr = expr.replace(/\s/g, '');
    let out = [];
    let bracketsStack = [];
    for(let i = 0; i < expr.length; i++){
        if(expr[i] === '('){
            bracketsStack.push(i)
        } else if(expr[i] === ')'){
            let expressionArray = []
            for(let j = bracketsStack[bracketsStack.length - 1] + 1; j < i; j++){
                expressionArray.push(expr[j])
            }
            let value = getValue(expressionArray)
            let exprArr = expr.split('')
            exprArr.splice(bracketsStack[bracketsStack.length - 1], i - bracketsStack[bracketsStack.length - 1] + 1, value)
            expr = exprArr.join('')
            bracketsStack.pop()            
        }
    }

    console.log('скобки: ',bracketsStack)

    return getValue(expr.split(''))
}

module.exports = {
    expressionCalculator
}