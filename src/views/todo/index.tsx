import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";

import { getFormattedDate } from "../../helpers/date-helpers";
import { DAY_DATE_MONTH_YEAR_FORMAT } from "../../constants/date";
import { deleteTodo } from "../../slices/todo";
import useDebounce from "../../hooks/useDebounce";
import type { IStore } from "../../types/store";
import type { ITodos } from "../../types/todo/todo-reducer";
import plusIcon from "../../assets/plus.png";
import searchIcon from "../../assets/search.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

export const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todos = useSelector((state: IStore) => state.todos.todos);

  const [activeAccordion, setActiveAccordion] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const searchDebounce = useDebounce(search);

  const todoWithStatus = useMemo(() => {
    const filteredTodos = searchDebounce
      ? todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchDebounce.toLowerCase())
        )
      : todos;
    return filteredTodos?.reduce(
      (acc: { [key: string]: ITodos[] }, todo) => {
        acc[todo.status].push(todo);
        return acc;
      },
      {
        pending: [],
        "in progress": [],
        completed: [],
      }
    );
  }, [todos, searchDebounce]);

  const handleToggle = (status: string) => {
    if (activeAccordion.includes(status)) {
      setActiveAccordion(activeAccordion.filter((s) => s !== status));
    } else {
      setActiveAccordion([...activeAccordion, status]);
    }
  };

  const handleEditTodo = (id: string) => {
    navigate(`/todo/${id}`);
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <header>
        <h1>TO-DO App</h1>
      </header>

      <div className="wrapper">
        <div className="input-wrapper">
          <img src={searchIcon} alt="plus-icon" />
          <input
            type="text"
            placeholder="Search To-do"
            style={{ border: "none" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {Object.keys(todoWithStatus).map((status) => {
            const isActive = activeAccordion.includes(status);
            return (
              <div className="todo-section" key={status}>
                <button
                  className="todo-header"
                  onClick={() => handleToggle(status)}
                >
                  <span className="todo-header-title">
                    {status}
                    <span className="todo-count">
                      ({todoWithStatus[status].length})
                    </span>
                  </span>

                  <span
                    className={`todo-arrow ${
                      activeAccordion.includes(status) ? "open" : ""
                    }`}
                  >
                    ⌃
                  </span>
                </button>

                {isActive &&
                  (todoWithStatus[status]?.length ? (
                    todoWithStatus[status].map((todo, index) => (
                      <div className="todo-body" key={`todo-items-${index}`}>
                        <div className="todo-card">
                          <div className="todo-left">
                            <div className="todo-avatar">{todo.title[0]}</div>
                          </div>
                          <div className="todo-right">
                            <div className="todo-title-sec">
                              <h3 className="todo-title">{todo.title}</h3>
                              <div className="status-section">
                                <span className={`status-dot ${todo.status}`} />
                                <span className="todo-status">{status}</span>
                              </div>
                            </div>
                            <p className="todo-desc">{todo.description}</p>
                            <div className="todo-action">
                              <div className="todo-date">
                                {getFormattedDate(
                                  todo.created_at,
                                  DAY_DATE_MONTH_YEAR_FORMAT
                                )}
                              </div>
                              <div className="todo-action-items">
                                <img
                                  src={editIcon}
                                  alt="edit-icon"
                                  onClick={() => handleEditTodo(todo?.id)}
                                />
                                <img
                                  src={deleteIcon}
                                  alt="delete-icon"
                                  onClick={() => handleDeleteTodo(todo?.id)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No data found</p>
                  ))}
              </div>
            );
          })}
        </div>
        <div className="add-icon">
          <img
            src={plusIcon}
            className="cursor-pointer"
            alt="plus-icon"
            onClick={() => navigate("/todo")}
          />
        </div>
      </div>
    </div>
  );
};
