import { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

import { todoValidationSchema } from "../../helpers/validation-schema";
import { addTodo, updateTodo } from "../../slices/todo";
import { generateUniqueId } from "../../helpers/common";
import type { IStore } from "../../types/store";
import Select from "../../components/ui/Select";
import backArrowIcon from "../../assets/back-arrow.svg";

export const AddOrUpdateTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const todos = useSelector((state: IStore) => state.todos.todos);

  const isUpdate = params?.id;
  const options = [
    { id: 1, label: "Pending", value: "pending", color: "gray" },
    { id: 2, label: "In Progress", value: "in progress", color: "orange" },
    { id: 3, label: "Completed", value: "completed", color: "green" },
  ];

  const { values, handleChange, setFieldValue, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        status: "pending",
      },
      validationSchema: todoValidationSchema,
      validateOnChange: true,
      onSubmit: (val) => {
        if (isUpdate) {
          const selectedTodo = todos?.find((todo) => todo.id === params?.id);
          if (selectedTodo) {
            dispatch(
              updateTodo({
                ...selectedTodo,
                ...val,
                updated_at: Date.now(),
              })
            );
            toast("Todo Updated Successfully", {
              type: "success",
            });
          }
        } else {
          dispatch(
            addTodo({
              id: generateUniqueId(),
              ...val,
              ...(!isUpdate && { created_at: Date.now() }),
              updated_at: Date.now(),
            })
          );
          toast("Todo Added Successfully", {
            type: "success",
          });
        }
        navigate("/");
      },
    });

  useEffect(() => {
    if (params?.id) {
      const todo = todos.find((todo) => todo.id === params.id);
      if (todo) {
        setFieldValue("title", todo.title);
        setFieldValue("description", todo.description);
        setFieldValue("status", todo.status);
      }
    }
  }, [params?.id, setFieldValue, todos]);

  return (
    <>
      <main>
        <header className="header-with-back">
          <img
            src={backArrowIcon}
            alt="back-arrow"
            onClick={() => navigate("/")}
          />
          <h1>{isUpdate ? "Edit" : "Add"} Task</h1>
        </header>
        <div className="wrapper todo-wrapper">
          <form onSubmit={handleSubmit} className="form">
            <div>
              <input
                type="text"
                name="title"
                placeholder="title"
                className="input  "
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && touched.title ? (
                <p className="err-text">{errors.title}</p>
              ) : null}
            </div>
            <div>
              <textarea
                name="description"
                placeholder="description"
                className="input"
                value={values.description}
                onChange={handleChange}
                rows={4}
              />
              {errors.description && touched.description ? (
                <p className="err-text">{errors.description}</p>
              ) : null}
            </div>
            {isUpdate ? (
              <Select
                value={
                  options.find((opt) => opt.value === values.status) ||
                  options[0]
                }
                options={options}
                onChange={(opt) => setFieldValue("status", opt.value)}
                renderSelected={(selected) => (
                  <>
                    <span className={`dot ${selected.color}`} />
                    <span>{selected.label}</span>
                  </>
                )}
                renderOption={(opt) => (
                  <>
                    <span className={`dot ${opt.color}`} />
                    <span>{opt.label}</span>
                  </>
                )}
              />
            ) : null}

            <div className="form-action">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                className={`btn btn-primary ${
                  Object.keys(errors)?.length ? "pointer-events-none" : ""
                }`}
                type="submit"
              >
                {isUpdate ? "Update" : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
