import React from "react";

const AddButton = () => {
  return (
    <div className="fixed-action-btn">
      <a href="#!" className="btn-floating btn-large black">
        <i className="material-icons large">add</i>
      </a>
      <ul>
        <li>
          <a
            href="#add-item-modal"
            className="btn-floating modal-trigger black"
          >
            <i className="material-icons">games</i>
          </a>
        </li>
        <li>
          <a href="#add-tag-modal" className="btn-floating black modal-trigger">
            <i className="material-icons">format_list_bulleted</i>
          </a>
        </li>
        <li>
          <a
            href="#add-platform-modal"
            className="btn-floating black modal-trigger"
          >
            <i className="material-icons">tv</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddButton;
