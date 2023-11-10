import React from "react";
import { motion } from "framer-motion";

import { fadeInOut } from "../animations";
import { BsExclamationTriangleFill, FaCheck } from "../assets/icons";

const Alert = ({ type, message }) => {
    // success - green
    if (type === "success") {
        return (
            <motion.div
                {...fadeInOut}
                className="fixed z-50 top-5 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-300 shadow-md flex items-center gap-4"
            >
                <FaCheck className="text-xl text-emerald-700" />
                <p className="text-xl text-emerald-700">{message}</p>
            </motion.div>
        );
    }

    // warning - orange
    if (type === "warning") {
        return (
            <motion.div
                {...fadeInOut}
                className="fixed z-50 top-5 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-4"
            >
                <BsExclamationTriangleFill className="text-xl text-orange-700" />
                <p className="text-xl text-orange-700">{message}</p>
            </motion.div>
        );
    }

    // error - red
    if (type === "danger") {
        return (
            <motion.div
                {...fadeInOut}
                className="fixed z-50 top-5 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-red-300 shadow-md flex items-center gap-4"
            >
                <BsExclamationTriangleFill className="text-xl text-red-700" />
                <p className="text-xl text-red-700">{message}</p>
            </motion.div>
        );
    }

    // info - blue
    if (type === "info") {
        return (
            <motion.div
                {...fadeInOut}
                className="fixed z-50 top-5 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-300 shadow-md flex items-center gap-4"
            >
                <BsExclamationTriangleFill className="text-xl text-blue-700" />
                <p className="text-xl text-blue-700">{message}</p>
            </motion.div>
        );
    }
};

export default Alert;