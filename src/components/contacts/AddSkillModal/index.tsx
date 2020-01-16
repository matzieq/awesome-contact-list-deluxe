import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import contactContext from "context/contacts/contactContext";

const AddSkillModal = () => {
  const { addSkill } = useContext(contactContext);

  const onSubmit = (values: any, actions: any) => {
    const { name } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    const dataItem = {
      name
    };
    addSkill(dataItem);
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
