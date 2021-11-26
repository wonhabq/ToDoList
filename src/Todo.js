import React, { memo } from "react";

function Todo(props) {
  const ref = React.useRef(null);
  const [show, setshow] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  function onBlur(id) {
    setEdit(false);
    props.onEdit(id, ref.current.value);
  }

  function onKeyPress(id) {
    return (e) => {
      if (e.key === "Enter") {
        setEdit(false);
        props.onEdit(id, ref.current.value);
      }
    };
  }

  React.useEffect(() => {
    if (edit) {
      ref.current.focus();
    }
  }, [edit]);

  if (edit) {
    return (
      <div>
        <input
          type="text"
          className="w-full"
          defaultValue={props.text}
          ref={ref}
          onBlur={() => onBlur(props.id)}
          onKeyPress={onKeyPress(props.id)}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center p-[15px] border-b-[1px] text-gray-500 text-[24px] duration-500 hover:bg-red-50 ease-in-out"
      onMouseEnter={() => setshow(true)}
      onMouseLeave={() => setshow(false)}
      onDoubleClick={() => setEdit(true)}
    >
      <div className="flex flex-1 items-center">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => props.toggleTodo(props.id, props.checked)}
          className="mr-2"
        />
        <p
          style={{
            textDecoration: props.checked ? "line-through" : "none",
          }}
        >
          {props.text}
        </p>
      </div>
      {show && <button onClick={() => props.deleteTodo(props.id)}>X</button>}
    </div>
  );
}

export default memo(Todo);
