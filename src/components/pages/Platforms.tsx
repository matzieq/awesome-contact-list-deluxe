import React, { useContext } from "react";
import { Platform } from "context/model";
import PlatformContext from "context/platforms/platformContext";

const Platforms = () => {
  const { platforms, deletePlatform, setEditedPlatform } = useContext(
    PlatformContext
  );

  return (
    <>
      <div className="row section">
        <div className="col s12">
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
                        <div className="col s4 m3 xl1 right">
                          <button
                            className="btn black right"
                            onClick={() => deletePlatform(platform._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                        <div className="col s4 m3 xl1 right">
                          <a
                            href="#edit-platform-modal"
                            className="btn black modal-trigger right"
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
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <a
            href="#add-platform-modal"
            className="btn black modal-trigger right"
          >
            new<i className="material-icons right">add</i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Platforms;
