import React, { useContext } from "react";
import { Tag } from "context/model";
import TagContext from "context/tags/tagContext";

const Tags = () => {
  const { tags, deleteTag, setEditedTag } = useContext(TagContext);

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
                  <div className="col s1 right">
                    <button className="btn" onClick={() => deleteTag(tag._id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                  <div className="col s1 right">
                    <a
                      href="#edit-tag-modal"
                      className="btn modal-trigger"
                      onClick={() => setEditedTag(tag)}
                    >
                      <i className="material-icons">build</i>
                    </a>
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
