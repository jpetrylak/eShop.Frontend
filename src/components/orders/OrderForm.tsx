import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IOrderCreate, OrdersService } from "API/orders";

type OrderFormProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultProps: OrderFormProps = { openModal: false, setOpenModal: () => {} };

export const OrderForm = ({ openModal, setOpenModal }: OrderFormProps) => {
  const [formData, setFormData] = useState<IOrderCreate>({ userEmail: "", shippingAddress: "" });

  const toggle = () => setOpenModal(!openModal);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const result = await OrdersService.createAsync2(formData);
    console.log("result: ", result);
  };

  return (
    <>
      <Modal isOpen={openModal} toggle={toggle}>
        <Form id={"order-form"} onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <FormGroup className="position-relative">
              <Label for="userEmail">User e-mail</Label>
              <Input type="email" name="userEmail" onChange={handleInputChange} />

              <Label for="shippingAddress">Shipping address</Label>
              <Input type="text" name="shippingAddress" onChange={handleInputChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type={"submit"}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
            >
              Create
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

OrderForm.defaultProps = defaultProps;
