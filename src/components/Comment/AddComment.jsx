import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction, updateCommentAction } from "../../redux/slices/comments/commentSlice";
import { useNavigate } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
    description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId, description, edit, commentId }) => {
    const [newDescription, setNewDescription] = useState(description)
    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    //dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            description: description,
        },
        onSubmit: values => {
            const data = {
                postId,
                description: values?.description,
            };
            //dispatch action
            if (!userAuth) {
                navigate('/login')
            } else {
                dispatch(createCommentAction(data));
            }

        },
        validationSchema: formSchema,
    });
    const handleChange = (e) =>{
        setNewDescription(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            id: commentId,
            description: newDescription
        }
        dispatch(updateCommentAction(comment))
    }
    return (
        <>
            {!edit ? <div className="flex flex-col justify-center items-center">
                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-1 flex m-auto"
                >
                    <input
                        onBlur={formik.handleBlur("description")}
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        type="text"
                        name="text"
                        id="text"
                        className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Add New comment"
                    />

                    <button
                        type="submit"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
                <div className="text-red-400 mb-2 mt-2">
                    {formik.touched.description && formik.errors.description}
                </div>
            </div> :
                <div className="flex flex-col justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="mt-1 flex m-auto"
                    >
                        <input

                            value={newDescription? newDescription : description}
                            onChange={handleChange}
                            type="text"
                            name="text"
                            id="text"
                            className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Add New comment"
                        />

                        <button
                            type="submit"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </form>

                </div>}
        </>
    );
};

export default AddComment;
