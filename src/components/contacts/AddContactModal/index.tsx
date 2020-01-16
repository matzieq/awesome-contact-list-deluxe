import React, { useContext, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import contactContext from "context/contacts/contactContext";
import dayjs from "dayjs";
import { Skill } from "context/contacts/model";
import M from "materialize-css";

const AddContactModal = () => {
  const { addContact, skills } = useContext(contactContext);
  console.log(skills);

  useEffect(() => {
    const select = document.querySelectorAll("select");
    M.FormSelect.init(select, {});
  }, [skills]);

  const onSubmit = (values: any, actions: any) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    const dataItem = {
      ...values,
      dateAdded: dayjs().format("YYYY-MM-DD"),
      skills: values.skills
        .filter((skill: string) => skill !== "")
        .map((skillFromForm: string) =>
          skills.find((skill: Skill) => skill._id.toString() === skillFromForm)
        )
    };
    addContact(dataItem);
    setSubmitting(false);
  };

  return (
    <div id="add-contact-modal" className="modal">
      <div className="modal-content">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            company: "",
            department: "",
            skills: []
          }}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" />
              <Field type="email" name="email" placeholder="Email" />
              <Field type="text" name="phone" placeholder="Phone" />
              <Field type="text" name="company" placeholder="Company" />
              <Field type="text" name="department" placeholder="Department" />
              <Field as="select" name="skills" multiple>
                <option value="" disabled>
                  Choose your option
                </option>
                {skills.map((skill: Skill) => (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                ))}
              </Field>
              <label>Materialize Multiple Select</label>
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

export default AddContactModal;
