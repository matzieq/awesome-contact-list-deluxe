import React, { useRef, useEffect, useContext } from "react";
import { Item, Tag } from "context/model";
import M from "materialize-css";
import itemContext from "context/items/itemContext";

interface DisplayItemModalProps {
  item: Item | null;
  setTappedItem: any;
}

const DisplayItemModal: React.FC<DisplayItemModalProps> = ({
  item,
  setTappedItem
}) => {
  const modalRef = useRef(null);
  const { deleteItem, setCurrent } = useContext(itemContext);
  useEffect(() => {
    // M.AutoInit();
    if (modalRef.current) {
      M.Modal.init(modalRef.current, {
        onCloseEnd: () => setTappedItem(null)
      });
    }
  });
  useEffect(() => {
    if (window.innerWidth > 767) {
      return;
    }
    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      console.log(modalInstance);
      console.log(modalRef.current);
      if (item) {
        modalInstance.open();
      } else {
        modalInstance.close();
      }
    }
  }, [item]);

  const onDeleteClick = () => {
    M.Modal.getInstance(modalRef.current).close();
    deleteItem(item._id);
    setTappedItem(null);
  };

  const onEditClick = () => {
    M.Modal.getInstance(modalRef.current).close();
    setCurrent(item);
    setTappedItem(null);
  };
  return (
    <div id="display-item-modal" ref={modalRef} className="modal">
      {item && (
        <>
          <div className="row">
            <div className="col s12">
              <h5>Name</h5>
              <p>{item.name}</p>
            </div>
            <div className="col s12">
              <h5>Platform</h5>
              <p>{item.platform.name}</p>
            </div>
            <div className="col s12">
              <h5>Date Added</h5>
              <p>{item.dateAdded}</p>
            </div>
            <div className="col s12">
              <h5>Tags</h5>
              {item.tags.map((tag: Tag) => (
                <p key={tag._id}>{tag.name}</p>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col s3 l6 right">
              <button className="btn right black" onClick={onDeleteClick}>
                <i className="material-icons">delete</i>
              </button>
            </div>
            <div className="col s3 l6 right">
              <a
                href="#edit-item-modal"
                className="btn black modal-trigger right"
                onClick={onEditClick}
              >
                <i className="material-icons">build</i>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayItemModal;
