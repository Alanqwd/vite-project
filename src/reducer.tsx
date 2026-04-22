import React, {useReducer, useState} from "react";

type CounterState ={
    count: number;
    step: number;
};

type CounterActions = 
| {type: "INCREMENT"} // без payload
| {type: "DECREMENT"} // без payload
| {type: "SET", payload: number}
| {type: "RESET", payload?: never};

/*

*/
const INITIAL_STATE: CounterState = { count: 0, step: 1};

function counterReducer(
    state: CounterState,
    actions: CounterActions
){
  switch (actions.type){
    case "INCREMENT":
    return{...state, count: state.count + state.step};
     case "DECREMENT":
    return{...state, count: state.count - state.step};
        case "SET":
    return{...state, count: actions.payload};
     case "RESET":
    return INITIAL_STATE;
  }
}

export default function reducer(){
const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE);
    return(
        <>
        <p>Count: {state.count} </p>
 <button 
 onClick={() => dispatch({type: "INCREMENT"})}
 >+</button>
  <button 
 onClick={() => dispatch({type: "DECREMENT"})}
 >-</button>
  <button 
 onClick={() => dispatch({type: "SET", payload: 10})}
 >SET 10</button>
  <button 
 onClick={() => dispatch({type: "RESET"})}
 >Reset</button>

        </>
    )
}

// reducer - функция которая принимает два аргумента: состояние и объект описываемый, что произошло   
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 