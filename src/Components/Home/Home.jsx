import React, { useState } from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeletIcon from "@material-ui/icons/Delete";

const Home = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [itemsDone, setItemsDone] = useState([]);
  const [itemsDoneCheck, setItemsDoneCheck] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItems, setEditItems] = useState(null);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === editItems) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData(" ");
      setEditItems(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        completed: false,
      };
      setItems([...items, allInputData]);
      setInputData(" ");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditItems(id);
  };

  const completeTodo = (e, elem) => {
    setItems(
      items.map((item) => {
        if (item.id === elem) {
          item.completed = e.target.checked;
        }
        return item;
      })
    );
  };

  const sortDone = () => {
    setItemsDoneCheck(true);
    let arr = items.filter((item) => item.completed === true);
    setItemsDone(arr);
  };

  const sortTodo = () => {
    setItemsDoneCheck(true);
    let arr = items.filter((item) => item.completed === false);
    setItemsDone(arr);
  };

  const handelKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="container">
      <div className="main_container">
        <h5>Task Input</h5>
        <form>
          <div className="top_container">
            <input
              type="text"
              placeholder="New Todo"
              value={inputData}
              maxLength={30}
              onKeyDown={(e) => {
                handelKeyDown(e);
              }}
              onChange={(e) => {
                e.preventDefault();
                setInputData(e.target.value);
              }}
            />
            {toggleSubmit ? (
              <Button onClick={addItem} className="top-btn" variant="primary">
                Add new Task
              </Button>
            ) : (
              <Button onClick={addItem} className="top-btn" variant="primary">
                Edit Task
              </Button>
            )}
          </div>
        </form>
        <div>
          <h5>TodoList</h5>
          <div className="todo_list">
            <Button
              className="btns"
              onClick={() => {
                setItemsDoneCheck(false);
              }}
            >
              All Tasks
            </Button>
            <Button className="btns" onClick={sortDone}>
              Completed Tasks
            </Button>
            <Button className="btns" onClick={sortTodo}>
              Pending Tasks
            </Button>
          </div>
          <div className="list">
            {!itemsDoneCheck && (
              <ol>
                {items.map((elem) => {
                  return (
                    <div className="todo">
                      <li className="item" key={elem.id}>
                        <div>
                          <h3>{elem.name}</h3>
                        </div>
                        <div className="action">
                          <input
                            onChange={(e) => completeTodo(e, elem.id)}
                            className="checkbox"
                            type="checkbox"
                            checked={elem.completed}
                          ></input>
                          <EditIcon
                            onClick={() => editItem(elem.id)}
                            className="edit"
                          ></EditIcon>
                          <DeletIcon
                            onClick={() => deleteItem(elem.id)}
                            className="icon"
                          ></DeletIcon>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ol>
            )}
            {itemsDoneCheck && (
              <ol>
                {itemsDone.map((elem) => {
                  return (
                    <div className="todo">
                      <li className="item" key={elem.id}>
                        <div>
                          <h3>{elem.name}</h3>
                        </div>
                        <div className="action">
                          <input
                            onChange={(e) => completeTodo(e, elem.id)}
                            className="checkbox"
                            type="checkbox"
                            checked={elem.completed}
                          ></input>
                          <EditIcon
                            onClick={() => editItem(elem.id)}
                            className="edit"
                          ></EditIcon>
                          <DeletIcon
                            onClick={() => deleteItem(elem.id)}
                            className="icon"
                          ></DeletIcon>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
