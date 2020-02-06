import React, { useContext } from "react";
import itemContext from "context/items/itemContext";
import { Tag } from "context/items/model";

const Tags = () => {
  const { tags, deleteTag } = useContext(itemContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {tags &&
          tags.map((tag: Tag) => (
            <tr key={tag._id}>
              <td>{tag.name}</td>
              <td>
                <div className="row">
                  <div className="col s1 offset-s11">
                    <button className="btn" onClick={() => deleteTag(tag._id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Tags;
