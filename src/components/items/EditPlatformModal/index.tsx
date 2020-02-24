import React, { useContext, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import M from "materialize-css";
import * as Yup from "yup";
import platformContext from "context/platforms/platformContext";

const PlatformSchema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const EditPlatformModal = () => {
  const { updatePlatform, editedPlatform, clearEditedPlatform } = useContext(
    platformContext
  );
  const modalRef = useRef(null);

  const onSubmit = (values: any, actions: any) => {
    const { name } = values;
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);
    const dataItem = {
      _id: editedPlatform._id,
      name
    };

    updatePlatform(dataItem);
    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      modalInstance.close();
    }
    resetForm();
    setSubmitting(false);
    clearEditedPlatform();
  };

  return (
    <div id="edit-platform-modal" ref={modalRef} className="modal">
      <div className="modal-content">
        {editedPlatform && (
          <Formik
            initialValues={{
              name: editedPlatform.name
            }}
            onSubmit={onSubmit}
            validationSchema={PlatformSchema}
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

export default EditPlatformModal;
