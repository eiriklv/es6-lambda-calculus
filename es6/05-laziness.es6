
var LAZY_TRUE = x => y => x();
var LAZY_FALSE = x => y => y();
var LAZY_COND = true_lazy_exp => false_lazy_exp => condition => (condition(LAZY_TRUE)(LAZY_FALSE))(true_lazy_exp)(false_lazy_exp);

// var BIGGER_X_THAN_Y = x => y => (AND(ISZERO(y))(NOT(ISZERO(x))))(TRUE)(BIGGER_X_THAN_Y(PRED(x))(PRED(y))); // forbidden syntax

var BIGGER_X_THAN_Y1 = f => x => y => LAZY_COND(_ => TRUE)(_ => f(f)(PRED(x))(PRED(y)))(AND(ISZERO(y))(NOT(ISZERO(x))));
// BIGGER_X_THAN_Y = BIGGER_X_THAN_Y1(BIGGER_X_THAN_Y1);
// BIGGER_X_THAN_Y(THREE)(TWO); // TRUE
// BIGGER_X_THAN_Y(THREE)(FOUR); // Error - Too much recursion
// BIGGER_X_THAN_Y(THREE)(THREE); // Error - Too much recursion

var BIGGER_X_THAN_Y2 = f => x => y => LAZY_COND(_ => TRUE)(_ => LAZY_COND(_ => FALSE)(_ => f(f)(PRED(x))(PRED(y)))(AND(ISZERO(x))(NOT(ISZERO(y)))))(AND(ISZERO(y))(NOT(ISZERO(x))));
// BIGGER_X_THAN_Y = BIGGER_X_THAN_Y2(BIGGER_X_THAN_Y2);
// BIGGER_X_THAN_Y(THREE)(TWO); // TRUE
// BIGGER_X_THAN_Y(THREE)(FOUR); // FALSE
// BIGGER_X_THAN_Y(THREE)(THREE); // Error - Too much recursion

// the good one!
var BIGGER_X_THAN_Y3 = f => x => y => LAZY_COND(_ => TRUE)(_ => LAZY_COND(_ => FALSE)(_ => f(f)(PRED(x))(PRED(y)))(OR(AND(ISZERO(x))(ISZERO(y)))(AND(ISZERO(x))(NOT(ISZERO(y))))))(AND(ISZERO(y))(NOT(ISZERO(x))));
BIGGER_X_THAN_Y = SELF_APPLY(BIGGER_X_THAN_Y3);
// BIGGER_X_THAN_Y(THREE)(TWO); // TRUE
// BIGGER_X_THAN_Y(THREE)(FOUR); // FALSE
// BIGGER_X_THAN_Y(THREE)(THREE); // FALSE

var EQUAL1 = f => x => y => LAZY_COND(_ => TRUE)(_ => LAZY_COND(_ => FALSE)(_ => f(f)(PRED(x))(PRED(y)))(OR(AND(NOT(ISZERO(x)))(ISZERO(y)))(AND(ISZERO(x))(NOT(ISZERO(y))))))(AND(ISZERO(y))(ISZERO(x)));
var EQUAL = SELF_APPLY(EQUAL1);
// EQUAL(THREE)(TWO); // FALSE
// EQUAL(THREE)(FOUR); // FALSE
// EQUAL(THREE)(THREE); // TRUE

var jsinteger1 = n => f => N => LAZY_COND(_ => n)(_ => f(n + 1)(f)(PRED(N)))(ISZERO(N))
var jsinteger = jsinteger1(0)(jsinteger1);

// jsinteger(SIX) // --> 6
// jsinteger(MULT(SIX)(SIX)) // --> 36
// jsinteger(MULT(TEN)(MULT(TEN)(TEN))) // --> 1000
// jsinteger(MULT(TEN)(MULT(TEN)(MULT(TEN)(FIVE)))) // --> 5000

// The following lines come from a failed attempt at implementing stackless recursion 
// through the Turing combinator Theta.
// They are not mentioned in the README. Please disregard.
var MULT3 = f => x => y => LAZY_COND(_ => ZERO)(_ => ADD(x)(f(f)(x)(PRED(y))))(ISZERO(y));
var ADDO = THETA(MULT3);
