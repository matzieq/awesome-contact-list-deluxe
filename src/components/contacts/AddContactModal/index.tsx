import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import contactContext from "context/contacts/contactContext";
import dayjs from "dayjs";

const AddContactModal = () => {
  const { addContact } = useContext(contactContext);

  return (
    <div id="add-contact-modal" className="modal">
      <div className="modal-content">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            company: "",
            department: ""
          }}
          onSubmit={
            (values, actions) => {
              const dataItem = {
                ...values,
                dateAdded: dayjs().format("YYYY-MM-DD"),
                skills: []
              };
              addContact(dataItem);
            }
            // actions.setSubmitting(false);
            // setModalOpen(false);
          }
          render={() => (
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
              <Field type="email" name="email" placeholder="Email" />
              <Field type="text" name="phone" placeholder="Phone" />
              <Field type="text" name="company" placeholder="Company" />
              <Field type="text" name="department" placeholder="Department" />
              <button type="submit" className="btn">
                Add <i className="material-icons right">add</i>
              </button>
            </Form>
          )}
        />
      </div>
    </div>
  );
};

export default AddContactModal;
