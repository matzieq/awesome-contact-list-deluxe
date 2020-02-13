import React, { useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";
import dayjs from "dayjs";
import { Tag } from "context/model";
import M from "materialize-css";
import TagContext from "context/tags/tagContext";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  platform: Yup.string().required("This field is required")
});

const AddItemModal = () => {
  const { addItem } = useContext(itemContext);
  const { tags } = useContext(TagContext);

  const modalRef = useRef(null);
  useEffect(() => {
    const select = document.querySelectorAll("select");
    M.FormSelect.init(select, {});
  }, [tags]);

  const onSubmit = (values: any, actions: any) => {
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);
    const dataItem = {
      ...values,
      dateAdded: dayjs().format("YYYY-MM-DD"),
      tags: values.tags
        .filter((tag: string) => tag !== "")
        .map((tagFromForm: string) =>
          tags.find((tag: Tag) => tag._id.toString() === tagFromForm)
        )
    };

    if (modalRef.current) {
      const modalInstance = M.Modal.getInstance(modalRef.current);
      modalInstance.close();
    }

    addItem(dataItem);
    resetForm();
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
          {() => (
            <Form>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" />
              <Field type="text" name="platform" placeholder="Platform" />
              <ErrorMessage name="platform" />
              <div />
              <Field as="select" name="tags" multiple>
                <option value="" disabled>
                  Choose your option
                </option>
                {tags.map((tag: Tag) => (
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
