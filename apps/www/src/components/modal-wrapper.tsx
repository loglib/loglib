"use client";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-modal";

export function ModalWrapper({ modal, setModal, children, isLoading }) {

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
    };

    return (
        <AnimatePresence>
            {modal ? (
                <Modal
                    isOpen={modal}

                    onRequestClose={() => { setModal(false); }}
                    className="font-jost flex h-full items-center justify-center border-none outline-none backdrop:blur-xl"
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(4px)",
                        },
                        content: {},
                    }}
                >
                    <motion.div
                        variants={modalVariants} // Apply the animation variants
                        initial="hidden" // Set the initial animation state
                        animate="visible" // Set the target animation
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.1,
                            },
                        }} // Exit gracefully
                        transition={{
                            type: "keyframes",
                            delay: 0.1,
                            ease: "easeInOut",
                            duration: 0.3,
                        }}
                        className=" animate-in relative flex w-11/12 md:w-3/12 flex-col  justify-center rounded-md border bg-gradient-to-tr from-gray-100 to-gray-200 px-8 pb-10 pt-4 dark:from-black dark:to-slate-900/20 "
                    >
                        {children}
                    </motion.div>
                </Modal>
            ) : null}
        </AnimatePresence>
    );
}
