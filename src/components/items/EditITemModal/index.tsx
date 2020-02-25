import React, { useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import itemContext from "context/items/itemContext";
import { Tag, Platform } from "context/model";
import M from "materialize-css";
import TagContext from "context/tags/tagContext";
import PlatformContext from "context/platforms/platformContext";

const ItemSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  platform: Yup.string().required("This field is required")
});

const EditItemModal = () => {
  const { current, updateItem, clearCurrent } = useContext(itemContext);
  const { tags } = useContext(TagContext);
  const { platforms } = useContext(PlatformContext);
  console.log("Edit", platforms);
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
              platform: current.platform._id,
              tags: current.tags.map(tag => tag._id)
            }}
            onSubmit={onSubmit}
            validationSchema={ItemSchema}
          >
            {() => (
              <Form>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" />
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
                  Update <i className="material-icons right">save_alt</i>
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
