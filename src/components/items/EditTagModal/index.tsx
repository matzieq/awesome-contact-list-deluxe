import React, { useContext, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import M from "materialize-css";
import * as Yup from "yup";
import tagContext from "context/tags/tagContext";

const TagSchema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const EditTagModal = () => {
  const { updateTag, editedTag, clearEditedTag } = useContext(tagContext);
  const modalRef = useRef(null);

  const onSubmit = (values: any, actions: any) => {
    const { name } = values;
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);
    const dataItem = {
      _id: editedTag._id,
      name
    };

    updateTag(dataItem);
    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      modalInstance.close();
    }
    resetForm();
    setSubmitting(false);
    clearEditedTag();
  };

  return (
    <div id="edit-tag-modal" ref={modalRef} className="modal">
      <div className="modal-content">
        {editedTag && (
          <Formik
            initialValues={{
              name: editedTag.name
            }}
            onSubmit={onSubmit}
            validationSchema={TagSchema}
          >
            {() => (
              <Form>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="p" />
                <button type="submit" className="btn">
                  Update <i className="material-icons right">save_alt</i>
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditTagModal;
