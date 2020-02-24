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
          <th className="right-align">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tags &&
          tags.map((tag: Tag) => (
            <tr key={tag._id}>
              <td>{tag.name}</td>
              <td>
                <div className="row">
                  <div className="col s2 xl1 right">
                    <button
                      className="btn right"
                      onClick={() => deleteTag(tag._id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                  <div className="col s2 xl1 right">
                    <a
                      href="#edit-tag-modal"
                      className="btn modal-trigger right"
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
