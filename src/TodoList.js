import React from "react";
import { useLocation } from "react-router";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

import Todo from "./Todo";
import Footer from "./Footer";
import Header from "./Header";
import { db } from "./firebase-config";

function TodoList() {
  const { pathname } = useLocation();
  const [text, setText] = React.useState("");
  const [filteredTodos, setFilteredTodos] = React.useState([]);
  const [todos, setTodos] = React.useState([]);

  const onChangeText = React.useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onKeyPress = React.useCallback(
    async (e) => {
      const todosCollectionRef = collection(db, "todos");
      if (e.key === "Enter") {
        await addDoc(todosCollectionRef, {
          text: text,
          checked: false,
        });
        setText("");
      }
    },
    [text]
  );

  const toggleTodo = React.useCallback(async (id, checked) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { checked: !checked });
  }, []);

  const deleteTodo = React.useCallback(async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
  }, []);

  const clearCompleted = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }, []);

  const allDone = React.useCallback(async () => {
    const todosCollectionRef = collection(db, "todos");
    const batch = writeBatch(db);
    const q = query(todosCollectionRef, where("checked", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { checked: true });
    });
    await batch.commit();
  }, []);

  const onEdit = React.useCallback(async (id, text) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, { text });
  }, []);

  React.useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    const unsub = onSnapshot(todosCollectionRef, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsub();
    };
  }, []);

  React.useEffect(() => {
    setFilteredTodos(
      todos.filter((x) => {
        if (pathname === "/active") {
          return !x.checked;
        } else if (pathname === "/completed") {
          return x.checked;
        } else {
          return true;
        }
      })
    );
  }, [pathname, todos]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-indigo-50">
      <div>
        <h1
          className="font-bold text-center "
          style={{
            fontSize: "100px",
            color: "rgba(175, 47, 47, 0.30)",
          }}
        >
          Todos
        </h1>
        <div className=" bg-white">
          <Header
            allDone={allDone}
            onChangeText={onChangeText}
            onKeyPress={onKeyPress}
            text={text}
          />
          {filteredTodos.map((x, i) => (
            <Todo
              key={i}
              id={x.id}
              text={x.text}
              checked={x.checked}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              onEdit={onEdit}
            />
          ))}
          <Footer
            count={todos.filter((x) => !x.checked).length}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoList;
