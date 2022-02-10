import React, { useEffect, useState, FormEvent } from "react";
import { useParams, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { fetchTodo, updateTodo } from "../../redux/actions/todo.actions";


interface ITodoDetailProps extends RouteComponentProps { }

type TodoDetailParams = {
  id: string;
}

const TodoDetail: React.FC<ITodoDetailProps> = ({ history }) => {
  //Get the todo details and fill it in the form
  const todoDetails = useSelector((state: RootStateOrAny) => state.todoDetails);

  const { todo, loading } = todoDetails;
  let { id } = useParams<TodoDetailParams>();

  const [title, setTitle] = useState(todo && !loading && todo.title);
  const [description, setDescription] = useState(
    todo && !loading && todo.description
  );

  const dispatch = useDispatch();

  //dispatch action

  const formSubmitHandler = (e: FormEvent) => {
    const data = {
      title,
      description,
    };
    e.preventDefault();
    dispatch(updateTodo(id, data));
    history.push("/");
  };

  useEffect(() => {
    dispatch(fetchTodo(id));
  }, [dispatch, id]);

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          {todo ? (
            <>
              <h1 className="text-center">Update</h1>
              <form onSubmit={formSubmitHandler}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title </label>
                    <input
                      defaultValue={todo && todo.title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Title"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input
                      defaultValue={todo && todo.description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Todo Description"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary m-auto">
                    Edit Todo
                  </button>
                </fieldset>
              </form>
            </>
          ) : (
            "No Todo"
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
