import React from "react";

const AddButton = () => {
  return (
    <div className="fixed-action-btn">
      <a href="#!" className="btn-floating btn-large blue darken-2">
        <i className="material-icons large">add</i>
      </a>
      <ul>
        <li>
          <a
            href="#add-item-modal"
            className="btn-floating cyan darken-2 modal-trigger"
          >
            <i className="material-icons">person</i>
          </a>
        </li>
        <li>
          <a
            href="#add-skill-modal"
            className="btn-floating cyan darken-2 modal-trigger"
          >
            <i className="material-icons">build</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddButton;
