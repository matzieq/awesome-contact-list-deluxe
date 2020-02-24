import React, { useContext } from "react";
import { Platform } from "context/model";
import PlatformContext from "context/platforms/platformContext";

const Platforms = () => {
  const { platforms, deletePlatform, setEditedPlatform } = useContext(
    PlatformContext
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Platforms</th>
            <th className="right-align">Actions</th>
          </tr>
        </thead>
        <tbody>
          {platforms &&
            platforms.map((platform: Platform) => (
              <tr key={platform._id}>
                <td>{platform.name}</td>
                <td>
                  <div className="row">
                    <div className="col s2 xl1 right">
                      <button
                        className="btn right"
                        onClick={() => deletePlatform(platform._id)}
                      >
                        <i className="material-icons">delete</i>
                      </button>
                    </div>
                    <div className="col s2 xl1 right">
                      <a
                        href="#edit-platform-modal"
                        className="btn modal-trigger right"
                        onClick={() => setEditedPlatform(platform)}
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

      <a href="#add-platform-modal" className="btn modal-trigger right">
        new<i className="material-icons right">add</i>
      </a>
    </>
  );
};

export default Platforms;
