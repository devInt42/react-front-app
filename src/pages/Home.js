import { BsPersonCircle } from "react-icons/bs";
import React, { useState } from "react";
import Modal from "./SearchModal";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <BsPersonCircle size="30" onClick={openModal}></BsPersonCircle>

      <Modal open={modalOpen} close={closeModal} header="조직도"></Modal>
    </React.Fragment>
  );
};

export default Home;
