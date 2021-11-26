import React, { memo } from "react";

function Header(props) {
  return (
    <React.Fragment>
      <div className="border-b-[1px]">
        <button className="pl-4" onClick={props.allDone}>
          ❤
        </button>
        <input
          onChange={props.onChangeText}
          onKeyPress={props.onKeyPress}
          value={props.text}
          placeholder={"What needs to be done?"}
          className="p-[16px] text-[24px] font-semibold placeholder-black placeholder-opacity-[0.2]"
        />
      </div>
    </React.Fragment>
  );
}

export default memo(Header);
