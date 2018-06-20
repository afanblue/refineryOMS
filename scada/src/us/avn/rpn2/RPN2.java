package us.avn.rpn2;

/**  RPN2
 *
 *   Based on https://stackoverflow.com/questions/43025031/rpn-calculator-using-stacks
 *
 *   Modified to add functions other than 4 basic math functions
 *            to overload 
 *   
 *   For operations, the stack looks like:
 *          oldest  -->   op1
 *                        op2
 *          newest  -->   op3
 *   So when we pop an element from the stack we get "op3" and the "newest" member
 *   is now "op2".
 *
 *   Operations: 
 *      op      Stack B4 --> Stack After
 *       +       op1 op2 --> op1+op2
 *       -       op1 op2 --> op1-op2 
 *       *       op1 op2 --> op1*op2
 *       /       op1 op2 --> op1/op2
 *       %       op1 op2 --> op1%op2 (modulus)
 *       **      op1 op2 --> op1 raised to the op2 power
 *       dup     op1     --> op1 op1 (i.e., duplicated)
 *       swap    op1 op2 --> op2 op1
 *       sin     op1     --> sin(op1)
 *       cos     op1     --> cos(op1)
 *       tan     op1     --> tan(op1)
 *       log     op1     --> log10(op1)
 *       ln      op1     --> log(op1)  natural log
 *       sqrt    op1     --> sqrt(op1)
 *
 */
 
import java.util.HashMap;
import java.util.Scanner;
import java.util.Stack;

public class RPN2 {

    private Stack<Double> stack;
    private HashMap<String,Integer> operatorList;

    public RPN2() {
        stack = new Stack<Double>();  //creates stack
        operatorList = new HashMap<String,Integer>();
        operatorList.put("+",2);      // op1 op2 --> op1+op2
        operatorList.put("-",2);      // op1 op2 --> op1-op2 
        operatorList.put("*",2);      // op1 op2 --> op1*op2
        operatorList.put("/",2);      // op1 op2 --> op1/op2
        operatorList.put("%",2);      // op1 op2 --> op1%op2
        operatorList.put("**",2);     // op1 op2 --> op1 raised to the op2 power
        operatorList.put("pi",0);     //         --> PI (3.14159...)
        operatorList.put("dup",1);    // op1     --> op1 op1 (i.e., duplicated)
        operatorList.put("swap",2);   // op1 op2 --> op2 op1
        operatorList.put("sin",1);    // op1     --> sin(op1)
        operatorList.put("cos",1);    // op1     --> cos(op1)
        operatorList.put("tan",1);    // op1     --> tan(op1)
        operatorList.put("log",1);    // op1     --> log10(op1)
        operatorList.put("ln",1);     // op1     --> log(op1)  natural log
        operatorList.put("sqrt",1);   // op1     --> sqrt(op1)
    }
    
    void clearStack() {
        stack.clear();
    }

    public static void main(String[] args) {
    
        String expression, again;
        double result;

        Scanner keyboard = new Scanner(System.in);
        RPN2 evaluator = new RPN2();

        do {
            evaluator.clearStack();
            System.out.println("Enter a valid post-fix expression one token " +
                               "at a time with a space between each token (e.g. 5 4 + 3 2 1 - + *)");
            System.out.println("Each token must be an integer or an operator (+,-,*,/)");
            expression = keyboard.nextLine();

            result = evaluator.evaluate(expression);
            System.out.println();
            System.out.println("That expression equals " + result);

            System.out.print("Evaluate another expression [Y/N]? ");
            again = keyboard.nextLine();
            System.out.println();
        }
        while (again.equalsIgnoreCase("y"));
    }
    
    /**
     *
     */
    private double execOperation( String token, Integer nops ) 
            throws NumberFormatException {
    
        double op1, op2, result=0D;
        
        if( token.equals("dup") ) {
            op1 = (stack.pop().doubleValue());
            stack.push(op1);
            stack.push(op1);
        } else if( token.equals("swap") ) {
            op2 = (stack.pop()).doubleValue();
            op1 = (stack.pop()).doubleValue();
            stack.push(op2);
            stack.push(op1);
        } else {
            if( nops.equals(0) ) {
                op1 = 0D;
                op2 = 0D;
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));                
            } else if( nops.equals(1) ) {
                op1 = (stack.pop()).doubleValue();
                op2 = 0D;
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));
            } else if( nops.equals(2) ) {
                op2 = (stack.pop()).doubleValue();
                op1 = (stack.pop()).doubleValue();
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));
            }
        }
        return result;
    }

    /**
     * Method: evaluate
     * Description: scan the input string, evaluate the arguments,
     *              calculate the results
     * Parameters: String RPNstring w/x0, x1, x2, x3 for argument values
     *             Double[] values  values required for evaluation 
     */
    public double evaluate(String expr, Double[] values ) 
            throws NumberFormatException {

        double result = 0D;
        String token;
        Scanner parser = new Scanner(expr);     
        Integer nops = null;
        
        while (parser.hasNext()) {
            token = parser.next();          

            if ( null != (nops = isOperator(token)) ) {
                result = execOperation( token, nops );
            } else {
                if( token.charAt(0) == 'x' ) {
                    int ndx = Character.getNumericValue(token.charAt(1));
                    stack.push( values[ndx] ); 
                } else {
                    stack.push(new Double(Double.parseDouble(token)));
                }
            }
        }
        return result;
    }

    /**
     * Method: evaluate
     * Description: scan the input string, evaluate the arguments,
     *              calculate the results
     * Parameters: RPN string
     */
    public double evaluate(String expr) 
            throws NumberFormatException {

        Double[] v = new Double[0];
        return evaluate( expr, v );
    }

    /**
     * Method: isOperator
     * Description: validates that this is an operator and returns the number
     *              of arguments used.  Returns null if this is not an 
     *              operator
     */
    private Integer isOperator(String token) {
        return ( operatorList.get(token) );
    }

    /**
     * Method: evaluateSingleOperator
     * Description: actually executes the operation requested
     */
    private double evaluateSingleOperator(String operation, double op1, double op2) {
        double result = 0;

        switch (operation) {
            case "+":
                result = op1 + op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case "*":
                result = op1 * op2;
                break;
            case "/":
                result = op1 / op2;
                break;
            case "%":
                result = op1 % op2;
                break;
            case "pi":
                result = Math.PI;
                break;
            case "**":
                result = Math.pow( op1, op2);
                break;
            case "sqrt":
                result = Math.sqrt(op1);
                break;
            case "sin":
                result = Math.sin(op1);
                break;
            case "cos":
                result = Math.cos(op1);
                break;
            case "tan":
                result = Math.tan(op1);
                break;
            case "log":
                result = Math.log10(op1);
                break;
            case "ln":
                result = Math.log(op1);
                break;
            
        }
        return result;
    }

}