import { memo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

function Footer(props) {
  const { pathname } = useLocation();
  return (
    <div
      style={{
        color: "#777",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-around",
        height: "50px",
      }}
    >
      <p className="flex flex-1 items-center pl-4">{`${props.count} items left`}</p>
      <div className="flex flex-1 items-center pl-4">
        <Link
          className={classNames("none", pathname === "/" && "text-red-200")}
          style={{
            padding: "3px 7px",
            margin: "3px",
          }}
          to="/"
        >
          All
        </Link>
        <Link
          className={classNames(
            "none",
            pathname === "/active" && "text-red-200"
          )}
          style={{
            padding: "3px 7px",
            margin: "3px",
          }}
          to="/active"
        >
          Active
        </Link>
        <Link
          className={classNames(
            "none",
            pathname === "/completed" && "text-red-200"
          )}
          style={{
            padding: "3px 7px",
            margin: "3px",
          }}
          to="/completed"
        >
          Completed
        </Link>
      </div>
      <button
        className="pr-4 pl-4 hover:underline"
        onClick={props.clearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}

export default memo(Footer);
