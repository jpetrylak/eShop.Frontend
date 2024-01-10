import { IOrderCreate, ordersApiClient } from "API/orders";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { Dispatch, SetStateAction } from "react";
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useAlert from "../common";

type OrderCreateModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const defaultProps: OrderCreateModalProps = {
  openModal: false,
  setOpenModal: () => {}
};

export const OrderCreateModal = ({ openModal, setOpenModal }: OrderCreateModalProps) => {
  const formInitialValues: IOrderCreate = { userEmail: "", shippingAddress: "" };

  const { setAlert } = useAlert();

  const validationSchema = Yup.object({
    userEmail: Yup.string().length(500).email().required().label("User e-mail"),
    shippingAddress: Yup.string().length(100).required().label("Shipping address")
  });

  const toggle = () => setOpenModal(!openModal);

  const handleSubmitFormik = async (values: IOrderCreate, actions: FormikHelpers<IOrderCreate>): Promise<void> => {
    const apiResponse = await ordersApiClient.createAsync(values);

    if (apiResponse.isSuccessful) {
      setAlert("Order created!");
    } else {
      setAlert(apiResponse.problems?.title, "danger");
      const errors = apiResponse.problems?.errors;

      for (const property in errors) {
        const fieldErrorsLine = errors[property].join(" ");
        actions.setFieldError(property, fieldErrorsLine);
      }
    }

    actions.setSubmitting(false);
  };

  const isInvalid = (fieldError: any, fieldTouched: any) => fieldError && fieldTouched;

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => await handleSubmitFormik(values, actions)}
      >
        {({ dirty, isSubmitting, errors, touched }) => (
          <Modal isOpen={openModal} toggle={toggle} disabled={!dirty || isSubmitting} className={"order-create-modal"}>
            <Form>
              <ModalHeader toggle={toggle}>New order</ModalHeader>
              <ModalBody>
                <FormGroup className="position-relative">
                  <Label for="firstName">User e-mail</Label>
                  <Input
                    type={"text"}
                    name={"userEmail"}
                    tag={Field}
                    invalid={isInvalid(errors.userEmail, touched.userEmail)}
                  />
                  <FormFeedback>{errors.userEmail}</FormFeedback>
                </FormGroup>

                <FormGroup className="position-relative">
                  <Label for="firstName">Shipping address</Label>
                  <Input
                    type={"text"}
                    name={"shippingAddress"}
                    tag={Field}
                    invalid={isInvalid(errors.shippingAddress, touched.shippingAddress)}
                  />
                  <FormFeedback>{errors.shippingAddress}</FormFeedback>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type={"submit"}>
                  Create
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

OrderCreateModal.defaultProps = defaultProps;
