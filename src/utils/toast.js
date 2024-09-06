import toast from "react-hot-toast";

/**
 * Displays a toast notification based on the provided message and type (success or error).
 * @param {string} message - The message to display in the toast.
 * @param {('success'|'error')} type - The type of toast ('success' or 'error').
 */
export const showToast = (message, type = "success") => {
	const options = {
		style: {
			backgroundColor: "#1f2937", // Dark mode background (gray-800)
			color: "#ffffff", // White text
		},
	};

	if (type === "success") {
		toast.success(message, options);
	} else if (type === "error") {
		toast.error(message, options);
	} else {
		console.warn("Invalid toast type specified. Use 'success' or 'error'.");
	}
};
