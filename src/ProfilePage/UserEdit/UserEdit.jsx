import React, { useRef } from "react";
import Box from "../../UI/Box";

import css from "./UserEdit.module.css";

const UserEdit = (props) => {
  const fullName = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (fullName.current.value.trim() !== "") {
      props.onSave(fullName.current.value);
    } else {
      alert("Input correct name");
    }
  };

  return (
    <Box className={css.UserEditDiv}>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="new_full_name" className={css.Label}>
            Full name:
          </label>
          <input id="new_full_name" type="text" ref={fullName} />
        </div>
        <div className={css.ButtonsDiv}>
          <button type="submit" className={css.Button}>
            Change data
          </button>
          <button
            onClick={props.onCancel}
            className={`${css.Button} ${css.ButtonCancel}`}
          >
            Cancel
          </button>
        </div>
      </form>
    </Box>
  );
};

export default UserEdit;
