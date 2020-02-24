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

const EditItemModal = () => {
  const { current, updateItem, clearCurrent } = useContext(itemContext);
  const { tags } = useContext(TagContext);

  const modalRef = useRef(null);

  useEffect(() => {
    const select = document.querySelectorAll("select");
    M.FormSelect.init(select, {
      dropdownOptions: {
        container: document.body
      }
    });
  }, [tags, current]);

  const onSubmit = (values: any, actions: any) => {
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);
    const dataItem = {
      _id: current._id,
      ...values,
      dateAdded: current.dateAdded,
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

    updateItem(dataItem);
    resetForm();
    setSubmitting(false);
    clearCurrent();
  };

  return (
    <div id="edit-item-modal" ref={modalRef} className="modal">
      <div className="modal-content">
        {current && (
          <Formik
            initialValues={{
              name: current.name,
              platform: current.platform,
              tags: current.tags.map(tag => tag._id)
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
                  Update <i className="material-icons right">add</i>
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditItemModal;
