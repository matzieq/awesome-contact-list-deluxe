import React, { useContext, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import M from "materialize-css";
import * as Yup from "yup";
import tagContext from "context/tags/tagContext";

const TagSchema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const AddTagModal = () => {
  const { addTag } = useContext(tagContext);
  const modalRef = useRef(null);

  const onSubmit = (values: any, actions: any) => {
    const { name } = values;
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);
    const dataItem = {
      name
    };

    addTag(dataItem);
    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      modalInstance.close();
    }
    resetForm();
    setSubmitting(false);
  };

  return (
    <div id="add-tag-modal" ref={modalRef} className="modal">
      <div className="modal-content">
        <h5>Add tag</h5>
        <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={onSubmit}
          validationSchema={TagSchema}
        >
          {() => (
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="p" />
              <button type="submit" className="btn black">
                Add <i className="material-icons right">add</i>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTagModal;
