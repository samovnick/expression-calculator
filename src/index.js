function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    // parseing string
    let str =  expr;
   //  console.log(str);

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
                    stack.push(str[i]);
                    break;
                case "*":
                case "/":
                    if ((char = stack[stack.length - 1]) == "*" || (char = stack[stack.length - 1]) == "/") {
                        OPZ += " ";
                        OPZ += char;
                        stack.pop();
                    }
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

        // console.log(str);
        // console.log(OPZ);
        return OPZ;
    }

    function calculate(str) {
        str = str.replace(/\s+/g, " ");
        // console.log(str);
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

    return rezult = calculate(parseString(str));
    //console.log(rezult.toFixed(4));

}

module.exports = {
    expressionCalculator
}