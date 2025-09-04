"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./useModal";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
  const {
    isOpen,
    closeModal,
    modalContent,
    modalTitle,
  } = useModal();

  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setModalKey((prevKey) => prevKey + 1);
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={modalKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed w-full h-full z-[10000] flex justify-center items-end"
        >
          <motion.div
            initial={{ y: 200, opacity: 0.1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-[#141414] rounded-t-2xl relative h-85 w-full md:w-[80%]  shadow-xl shadow-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="h-full w-full relative overflow-x-hidden overflow-y-auto"
              animate={{ y: [-200, 0] }}
              exit={{ y: [0, -200] }}
            >
              <div className="text-[#7e4db2] fixed z-[1200] bg-[#141414] text-4xl rounded-t-2xl flex justify-start items-center gap-5">
                <button className="btn vibration hardhover" onClick={() => closeModal()}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <p className="font-bold">
                  {modalTitle}
                </p>
              </div>
              <div className="m-12">
                {modalContent}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence >
  );
};

export default Modal;
