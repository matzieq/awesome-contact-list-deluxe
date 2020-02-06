import React, { useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";
import dayjs from "dayjs";
import { Skill } from "context/items/model";
import M from "materialize-css";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  platform: Yup.string().required("This field is required")
});

const AddItemModal = () => {
  const { addItem, tags } = useContext(itemContext);

  const modalRef = useRef(null);
  useEffect(() => {
    const select = document.querySelectorAll("select");
    M.FormSelect.init(select, {});
  }, [tags]);

  const onSubmit = (values: any, actions: any) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    const dataItem = {
      ...values,
      dateAdded: dayjs().format("YYYY-MM-DD"),
      tags: values.tags
        .filter((tag: string) => tag !== "")
        .map((tagFromForm: string) =>
          tags.find((skill: Skill) => skill._id.toString() === tagFromForm)
        )
    };

    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      modalInstance.close();
    }

    addItem(dataItem);
    setSubmitting(false);
  };

  return (
    <div id="add-item-modal" ref={modalRef} className="modal">
      <div className="modal-content">
        <Formik
          initialValues={{
            name: "",
            platform: "",
            tags: []
          }}
          onSubmit={onSubmit}
          validationSchema={ItemSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                error={!!errors.name}
                // helperText={touched.name && errors.name}
              />
              <ErrorMessage name="name" />
              <Field
                type="text"
                name="platform"
                placeholder="Platform"
                error={!!errors.platform}
                // helperText={touched.platform && errors.platform}
              />
              <ErrorMessage name="platform" />
              <div />
              <Field as="select" name="tags" multiple>
                <option value="" disabled>
                  Choose your option
                </option>
                {tags.map((tag: Skill) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </Field>
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

export default AddItemModal;