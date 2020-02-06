import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";

const AddSkillModal = () => {
  const { addTag } = useContext(itemContext);

  const onSubmit = (values: any, actions: any) => {
    const { name } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    const dataItem = {
      name
    };
    addTag(dataItem);
    setSubmitting(false);
  };

  return (
    <div id="add-skill-modal" className="modal">
      <div className="modal-content">
        <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSkillModal;
