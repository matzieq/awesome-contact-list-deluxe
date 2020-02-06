import React, { useContext, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";
import M from "materialize-css";
import * as Yup from "yup";

const TagSchema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const AddTagModal = () => {
  const { addTag } = useContext(itemContext);
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
              <button type="submit" className="btn">
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
