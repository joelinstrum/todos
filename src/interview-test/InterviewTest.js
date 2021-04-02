import { useEffect, useState, useRef } from "react";
import "./style.scss"

const InterviewTest = () => {
  return <div><ButtonCounter /></div>
}

const Button = ({symbol, clickHandler, disabled, label}) => {
  return <button type="button" onClick={clickHandler} disabled={disabled}>{label}</button>
}

const ButtonCounter = () => {
  
  const [count, setCount] = useState(1)
  const [symbol, setCurrentSymbol] = useState("");
  const countRef = useRef(count);
  const [todos, setTodos] = useState({})
  const [isLoading, setIsLoading] = useState()
  const [isDisabled, setIsDisabled] = useState(true)

  const changeHandler = (symbol) => {
    setCurrentSymbol(symbol);
  }

  useEffect( () => {
    if(symbol === ">"){
      countRef.current++;
      setCount(countRef.current)
    } else if(symbol === "<") {
      if( countRef.current > 1) { 
        countRef.current--;
      }
    }
    setCurrentSymbol("");
    setCount(countRef.current)
  },[symbol, setCurrentSymbol])

  useEffect( () => {
    if(count === 1) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [count, setIsDisabled])

  useEffect(() => {
    const doUpdate = async() => {
      setIsLoading(true);
      await pause(1000)
      console.log(count);
      fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setIsLoading(false)
        setTodos(json);
      })
    }
    doUpdate();
  },[count, setIsLoading]);

  const pause = (time) => {
    return new Promise( accept => {
      setTimeout( () => {
        accept()
      }, time)
    });
  }

  return (
    <div>
      <span>Get todo: </span>
      <Button symbol="<" clickHandler={() => changeHandler("<")} disabled={isDisabled} label="Previous" />
      <Button symbol=">" clickHandler={() => changeHandler(">")} label="Next" />
      <div>Current ID: {countRef.current}</div>
      <div className="todos-container">Todos: 
        { 
          
            <div>
              <table border='1'>
                <tbody>
                <tr>
                  <th>Completed</th>
                  <th>id</th>
                  <th>title</th>
                  <th>userId</th>
                </tr>
                { isLoading ? <tr><td colspan='4' className="loading">...loading</td></tr> : (
                <tr>
                  <td className={`${todos.complete ? "completed" : "incomplete"}`}>{todos.completed}</td>
                  <td>{todos.id}</td>
                  <td>{todos.title}</td>
                  <td>{todos.userId}</td>
                </tr>
                )}
                </tbody>
              </table>

          </div>
          
        }
        
      </div>

    </div>
  )
}

export default InterviewTest