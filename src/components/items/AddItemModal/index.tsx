import React, { useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";
import dayjs from "dayjs";
import { Tag, Platform } from "context/model";
import M from "materialize-css";
import TagContext from "context/tags/tagContext";
import PlatformContext from "context/platforms/platformContext";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  platform: Yup.string().required("This field is required")
});

const AddItemModal = () => {
  const { addItem } = useContext(itemContext);
  const { tags } = useContext(TagContext);
  const { platforms } = useContext(PlatformContext);
  console.log(platforms);
  const modalRef = useRef(null);

  useEffect(() => {
    const select = document.querySelectorAll("select");
    M.FormSelect.init(select, {
      dropdownOptions: {
        container: document.body
      }
    });
  }, [tags]);

  const onSubmit = (values: any, actions: any) => {
    const { setSubmitting, resetForm } = actions;
    setSubmitting(true);

    const dataItem = {
      ...values,
      dateAdded: dayjs().format("YYYY-MM-DD"),
      platform: platforms.find(
        (platform: Platform) => platform._id.toString() === values.platform
      ),

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
        {platforms.length !== 0 && tags.length !== 0 ? (
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
                <div />
                <Field as="select" name="platform">
                  <option value="" disabled>
                    Choose your option
                  </option>
                  {platforms.map((platform: Platform) => (
                    <option key={platform._id} value={platform._id}>
                      {platform.name}
                    </option>
                  ))}
                </Field>
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
                <button type="submit" className="btn black">
                  Add <i className="material-icons right">add</i>
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <p className="danger">
            Add some {tags.length === 0 ? "tags" : ""}{" "}
            {tags.length === 0 && platforms.length === 0 ? "and " : ""}
            {platforms.length === 0 ? "platforms" : ""} first
          </p>
        )}
      </div>
    </div>
  );
};

export default AddItemModal;
