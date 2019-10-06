function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    // parseing string
    let str =  expr;
    //console.log(str);
    // check pair
    let countBracket1;
    let countBracket2;
    if (str.indexOf("(") != -1) countBracket1 = str.match(/\(/g).length;
    if (str.indexOf(")") != -1) countBracket2 = str.match(/\)/g).length;

    if (countBracket1 !== countBracket2)  throw "ExpressionError: Brackets must be paired";

    function parseString (str) {
        str = str.replace(/^\s*/,'').replace(/\s*$/,'');
        let OPZ = "";
        let stack = [];
        let char;
        for (let i = 0; i < str.length; i++) {
            switch (str[i]) {
                case "+":
                case "-":
                    if (stack.length == 0) {
                        OPZ += " ";
                        stack.push(str[i]);
                        break;
                    } 
                    while ( (char = stack[stack.length - 1]) == "*" || (char = stack[stack.length - 1]) == "/") {
                        OPZ += " ";
                        OPZ += char;
                        stack.pop();
                        OPZ += " ";
                    }
                    if ((char = stack[stack.length - 1]) == "+" || (char = stack[stack.length - 1]) == "-") {
                        OPZ += " ";
                        OPZ += char;
                        stack.pop();
                    }
                    OPZ += " ";
                    stack.push(str[i]);
                    break;
                case "*":
                case "/":
                    if ((char = stack[stack.length - 1]) == "*" || (char = stack[stack.length - 1]) == "/") {
                        OPZ += " ";
                        OPZ += char;
                        stack.pop();
                    }
                    OPZ += " ";
                    stack.push(str[i]);
                    break;
                case "(":
                    stack.push(str[i]);
                    break;
                case ")":
                    while ( (char = stack[stack.length - 1]) != "(") {
                        OPZ += " ";
                        OPZ += char;
                        stack.pop();
                    };
                    OPZ += " ";
                    stack.pop();
                    break;
                default: OPZ += str[i];
            }
        }

        while (stack.length != 0 ) {
            OPZ += " ";
            OPZ += stack[stack.length - 1];
            stack.pop();
        }

        //console.log(str);
        //console.log(OPZ);
        return OPZ;
    }

    function calculate(str) {
        str = str.replace(/\s+/g, " ");
        //console.log(str);
        if ((/ 0 \//).test(str)) throw "TypeError: Division by zero.";
        let stack = [];
        let arr = str.split(" ");
        arr.forEach(element => {
            let a, b;
            switch (element) {
                case "+":
                    b = stack[stack.length - 1];
                    stack.pop();
                    a = stack[stack.length - 1];
                    stack.pop();
                    stack.push(a + b);
                    break;
                case "-": 
                    b = stack[stack.length - 1];
                    stack.pop();
                    a = stack[stack.length - 1];
                    stack.pop();
                    stack.push(a - b);
                    break; 
                case "*": 
                    b = stack[stack.length - 1];
                    stack.pop();
                    a = stack[stack.length - 1];
                    stack.pop();
                    stack.push(a * b);
                    break; 
                case "/": 
                    b = stack[stack.length - 1];
                    stack.pop();
                    a = stack[stack.length - 1];
                    stack.pop();
                    stack.push(a / b);
                    break; 
                default:
                    stack.push(+element);
            }
        });
    
        return stack[stack.length - 1];
    
    }

    let rezult = calculate(parseString(str));
    return rezult;

}

module.exports = {
    expressionCalculator
}