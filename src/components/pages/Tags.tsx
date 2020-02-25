import React, { useContext } from "react";
import { Tag } from "context/model";
import TagContext from "context/tags/tagContext";

const Tags = () => {
  const { tags, deleteTag, setEditedTag } = useContext(TagContext);

  return (
    <>
      <div className="row section">
        <div className="col s12">
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
                        <div className="col s4 m3 right">
                          <button
                            className="btn black right"
                            onClick={() => deleteTag(tag._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                        <div className="col s4 m3 right">
                          <a
                            href="#edit-tag-modal"
                            className="btn black modal-trigger right"
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
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <a href="#add-tag-modal" className="btn black modal-trigger right">
            new<i className="material-icons right">add</i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Tags;
