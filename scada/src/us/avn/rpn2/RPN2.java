package us.avn.rpn2;


import java.time.Instant;
import java.util.HashMap;
import java.util.Scanner;
import java.util.Stack;

/**  RPN2
*
*   Based on https://stackoverflow.com/questions/43025031/rpn-calculator-using-stacks
*
*   Modified to add functions other than 4 basic math functions
*   to overload.  And if you think the changes are influenced by Forth,
*   you're right. 
*{@code
*   For operations, the stack looks like:
*<br/>          oldest  ==>   op1
*<br/>                        op2
*<br/>          newest  ==>   op3
*<br/>   So when we pop an element from the stack we get "op3" and the "newest" member
*   is now "op2".
*
*<br/>   Operations: 
*<br/>      op      Stack B4 => Stack After
*<br/>       +       op1 op2 => op1+op2
*<br/>       -       op1 op2 => op1-op2 
*<br/>       *       op1 op2 => op1*op2
*<br/>       /       op1 op2 => op1/op2
*<br/>       %       op1 op2 => op1%op2 (modulus)
*<br/>       **      op1 op2 => op1 raised to the op2 power
*<br/>       dup     op1     => op1 op1 (i.e., duplicated)
*<br/>       swap    op1 op2 => op2 op1
*<br/>       sin     op1     => sin(op1)
*<br/>       cos     op1     => cos(op1)
*<br/>       tan     op1     => tan(op1)
*<br/>       log     op1     => log10(op1)
*<br/>       ln      op1     => log(op1)  natural log
*<br/>       sqrt    op1     => sqrt(op1)
*<br>        pi              => pi (3.14159...)
*<br>        now             => epoch seconds Zulu time
*<br/>
*<br/> If there aren't enough arguments, i.e, the stack is empty, the missing 
*     arguments are replaced w/ 0's (zeros), which probably means that the results
*     are not trustworthy.
*<br/> This may not be the best solution, but since this is intended to run w/no 
*     user interaction, it seems like the best option available
*}  
*/
public class RPN2 {

    private Stack<Double> stack;
    private static HashMap<String,Integer> controlList = new HashMap<String,Integer>() { {
        put("if", 1);
        put("else",0);
        put("then",0);
    } };
    private static HashMap<String,Integer> operatorList = new HashMap<String,Integer>() { {
        put("+",2);      // op1 op2 --> op1+op2
        put("-",2);      // op1 op2 --> op1-op2 
        put("*",2);      // op1 op2 --> op1*op2
        put("/",2);      // op1 op2 --> op1/op2
        put("%",2);      // op1 op2 --> op1%op2
        put("**",2);     // op1 op2 --> op1 raised to the op2 power
        put(">",2);      // op1 op2 --> op1>op2  ? 1 : 0 (1=GT, 0=LE)
        put(">=",2);     // op1 op2 --> op1>=op2 ? 1 : 0 (1=GE, 0=LT)
        put("<",2);      // op1 op2 --> op1<op2  ? 1 : 0 (1=LT, 0=GE)
        put("<=",2);     // op1 op2 --> op1<=op2 ? 1 : 0 (1=LE, 0=GT)
        put("=",2);      // op1 op2 --> op1=op2  ? 1 : 0 (1=EQ, 0=NE)
        put("!=",2);     // op1 op2 --> op1!=op2 ? 1 : 0 (1=NE, 0=EQ)
        put("pi",0);     //         --> PI (3.14159...)
        put("now",0);    //         --> epoch seconds for Zulu time 
        put(".",1);      // returns entry on stack as result 
        put("dup",1);    // op1     --> op1 op1 (i.e., duplicated)
        put("swap",2);   // op1 op2 --> op2 op1
        put("sin",1);    // op1     --> sin(op1)
        put("cos",1);    // op1     --> cos(op1)
        put("tan",1);    // op1     --> tan(op1)
        put("log",1);    // op1     --> log10(op1)
        put("ln",1);     // op1     --> log(op1)  natural log
        put("sqrt",1);   // op1     --> sqrt(op1)
        put("abs",1);    // op1     --> abs(op1)
                         // NB, for logical purposes 0 => false, !=0 => true
        put("0>",1);     // op1     --> 0>op1 ? 1 : 0 (1=GT, 0=LE)
        put("0=",1);     // op1     --> 0=op1 ? 1 : 0 (1=EQ, 0=NE)
        put("0<",1);     // op1     --> 0<op1 ? 1 : 0 (1=LT, 0=GE)
        put("&", 2);     // op1 op2 --> (op1!=0)&&(op2!=0)  (logical and)
        put("|",2);      // op1 op2 --> (op1!=0)||(op2!=0)  (logical or)
        put("!",1);      // op1     --> (op1==0?1:0)        (logical not)
    } };

    public RPN2() {
        stack = new Stack<Double>();  //creates stack
/*        controlList = new HashMap<String,Integer>();
        controlList.put("if", 1);
        controlList.put("else",0);
        controlList.put("then",0);
        operatorList = new HashMap<String,Integer>();
        operatorList.put("+",2);      // op1 op2 --> op1+op2
        operatorList.put("-",2);      // op1 op2 --> op1-op2 
        operatorList.put("*",2);      // op1 op2 --> op1*op2
        operatorList.put("/",2);      // op1 op2 --> op1/op2
        operatorList.put("%",2);      // op1 op2 --> op1%op2
        operatorList.put("**",2);     // op1 op2 --> op1 raised to the op2 power
        operatorList.put(">",2);      // op1 op2 --> op1>op2  ? 1 : 0 (1=GT, 0=LE)
        operatorList.put(">=",2);     // op1 op2 --> op1>=op2 ? 1 : 0 (1=GE, 0=LT)
        operatorList.put("<",2);      // op1 op2 --> op1<op2  ? 1 : 0 (1=LT, 0=GE)
        operatorList.put("<=",2);     // op1 op2 --> op1<=op2 ? 1 : 0 (1=LE, 0=GT)
        operatorList.put("=",2);      // op1 op2 --> op1=op2  ? 1 : 0 (1=EQ, 0=NE)
        operatorList.put("!=",2);     // op1 op2 --> op1!=op2 ? 1 : 0 (1=NE, 0=EQ)
        operatorList.put("pi",0);     //         --> PI (3.14159...)
        operatorList.put(".",1);      // returns entry on stack as result 
        operatorList.put("dup",1);    // op1     --> op1 op1 (i.e., duplicated)
        operatorList.put("swap",2);   // op1 op2 --> op2 op1
        operatorList.put("sin",1);    // op1     --> sin(op1)
        operatorList.put("cos",1);    // op1     --> cos(op1)
        operatorList.put("tan",1);    // op1     --> tan(op1)
        operatorList.put("log",1);    // op1     --> log10(op1)
        operatorList.put("ln",1);     // op1     --> log(op1)  natural log
        operatorList.put("sqrt",1);   // op1     --> sqrt(op1)
        operatorList.put("abs",1);    // op1     --> abs(op1)
                                      // NB, for logical purposes 0 => false, !=0 => true
        operatorList.put("0>",1);     // op1     --> 0>op1 ? 1 : 0 (1=GT, 0=LE)
        operatorList.put("0=",1);     // op1     --> 0=op1 ? 1 : 0 (1=EQ, 0=NE)
        operatorList.put("0<",1);     // op1     --> 0<op1 ? 1 : 0 (1=LT, 0=GE)
        operatorList.put("&", 2);     // op1 op2 --> (op1!=0)&&(op2!=0)  (logical and)
        operatorList.put("|",2);      // op1 op2 --> (op1!=0)||(op2!=0)  (logical or)
        operatorList.put("!",1);      // op1     --> (op1==0?1:0)        (logical not)
  */
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
     * Execute the operation requested.
     * @param token specifying the next token in the string parsing
     * @param nops number of operands expected to exist on the stack.
     * @return result of operation 
     */
    private double execOperation( String token, Integer nops ) 
            throws NumberFormatException {
    
        double op1, op2, result=0D;
        
        if( token.equals("dup") ) {
        	if( ! stack.isEmpty() ) {
        		op1 = (stack.pop().doubleValue());
        	} else {
        		op1 = 0D;
        	}
        	stack.push(op1);
        	stack.push(op1);
        } else if( token.equals("swap") ) {
            if( ! stack.isEmpty() ) {
            	op2 = (stack.pop()).doubleValue();
            	if( ! stack.isEmpty() ) { 
            		op1 = (stack.pop()).doubleValue();
            	} else {
            		op1 = 0D;
            	}
            } else { 
            	op2 = 0D;
            	op1 = 0D;
            }
    		stack.push(op2);
    		stack.push(op1);
        } else {
            if( nops.equals(0) ) {
                op1 = 0D;
                op2 = 0D;
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));                
            } else if( nops.equals(1) ) {
            	if( ! stack.isEmpty() ) {
            		op1 = (stack.pop()).doubleValue();
            	} else {
            		op1 = 0D;
            	}
                op2 = 0D;
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));
            } else if( nops.equals(2) ) {
            	op1 = 0D;
            	op2 = 0D;
                if( ! stack.isEmpty() ) { op2 = (stack.pop()).doubleValue(); }
            	if( ! stack.isEmpty() ) { op1 = (stack.pop()).doubleValue(); }
                result = evaluateSingleOperator(token, op1, op2);
                stack.push(new Double(result));
            }
        }
        return result;
    }

    /**
     * Scan the input string (expr), evaluate the arguments (values), 
     * return the calculated results
     *              
     * @param expr String RPNstring w/x0, x1, x2, x3 for argument values
     * @param values Double[] values required for evaluation 
     * @return Long 
     */
    public double evaluate(String expr, Double[] values ) 
            throws NumberFormatException {

        double result = Double.NaN;
        String control = "B";
        String token;
        Scanner parser = new Scanner(expr);     
        Integer nops = null;
        
        while (parser.hasNext()) {
            token = parser.next();          
//            System.out.println("In  "+token+" - Stack size: "+stack.size()+", result: "+result+", control: "+control);
            if( "e".equals(control) || "T".equals(control) ) {
            	if( null != (nops = isControl(token)) ) {
                	control = execControl( token, nops, control );
            	}
            } else if ( null != (nops = isOperator(token))  ) {
                result = execOperation( token, nops );
            } else if( null != (nops = isControl(token)) ) {
            	control = execControl( token, nops, control );
            } else {
                if( token.charAt(0) == 'x' ) {
                    int ndx = Character.getNumericValue(token.charAt(1));
                    stack.push( values[ndx] ); 
                } else {
                    stack.push(new Double(Double.parseDouble(token)));
                }
            }
            parser.close();
 //           System.out.println("Out "+token+" - Stack size: "+stack.size()+", result: "+result+", control: "+control);
        }
        return (stack.pop()).doubleValue();
    }
    
    /**
     * Execute the control tokens (if, else, then, ... )
     * 
     * @param token String, to evaluate
     * @param nops Integer, number of operators to consume
     * @param c String, current state
     * @return new state
     * {@code B => "then" found => control block complete (restore to starting condition)
     * <br>       e => "if" found, result was false, 
     * <br>            => look for "else" (i.e., skip everything until "else" found)
     * <br>       E => "else" found, state was "e" => can compute now until "then" found 
     * <br>       I => "if" found, result was true
     * <br>            process stuff until else found, then skip to end
     * <br>       T => "else" found, state was "c" => skip everything until "then" found
     * }
     */
    public String execControl( String token, Integer nops, String c ) {
    	Double op1 = 0D;
    	String control = "X";
    	if( "if".equals(token) && "B".equals(c) ) {
        	op1 = (stack.pop()).doubleValue();
    		if( op1 != 0D ) {
    			control = "I";
    		} else {
    			control = "e";
    		}
    	} else if( "else".equals(token) ) {
    		if( "e".equals(c) ) {
    			control = "E";
    		} else if( "I".equals(c) ) {
    			control = "T";
    		}
    	} else if( "then".equals(token) ) {
    		control = "B";
    	}
    	return control;
    }

    /**
     * Evaluate the input string as a floating point (double) number
     * @param expr String, value to evalute
     * @return number
     */
    public double evaluate(String expr) 
            throws NumberFormatException {

        Double[] v = new Double[0];
        return evaluate( expr, v );
    }

    /**
     * Validates that this is an operator and returns the number
     * of arguments used.  Returns null if this is not an operator
     * @param token String, potential token string to evaluate
     * @return number of operands used for this operation (token)
     */
    private Integer isOperator(String token) {
        return ( operatorList.get(token) );
    }

    /**
     * Validates that this is an control token and returns the number
     * of arguments used.  Returns null if this is not a control
     * 
     * @param token String 
     * @return number of operands for this token
     */
    private Integer isControl(String token) {
        return ( controlList.get(token) );
    }

    /**
     * Actually executes the operation requested
     * 
     * @param operation (String), to evaluate
     * @param op1 (double) operand one
     * @param op2 (double) operand two
     * @return double, results of operation
     */
    private double evaluateSingleOperator(String operation, double op1, double op2) {
        double result = 0;

        switch (operation) {
        	case ".":
        		result = op1;
        		break;
        	case "&":
        		result = ((op1!=0) && (op2!=0))?1D:0D;
        		break;
        	case "|":
        		result = ((op1!=0) || (op2!=0))?1D:0D;
        		break;
        	case "!":
        		result = (op1!=0)?0:1;
        		break;
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
            case "0>":
            	result = op1 > 0D?1D:0D;
            	break;
            case "0=":
            	result = op1 == 0D?1D:0D;
            	break;
            case "0<":
            	result = op1 < 0D?1D:0D;
            	break;
            case ">":
            	result = op1 > op2?1D:0D;
            	break;
            case ">=":
            	result = op1 >= op2?1D:0D;
            	break;
            case "<":
            	result = op1 < op2?1D:0D;
            	break;
            case "<=":
            	result = op1 <= op2?1D:0D;
            	break;
            case "=":
            	result = (op1 == op2)?1D:0D;
            	break;
            case "!=":
            	result = op1 != op2?1D:0D;
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
            case "abs":
            	result = Math.abs(op1);
            	break;
            case "now":
            	Long n = Instant.now().getEpochSecond();
            	result = new Double(n);
        }
        return result;
    }

}