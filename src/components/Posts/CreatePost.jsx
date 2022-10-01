import React, { useRef } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { createpostAction } from '../../redux/slices/posts/postSlice';
import Dropzone from 'react-dropzone'
import CategoryDropDown from '../Categories/CategoryDropdown';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import JoditEditor from "jodit-react";
//css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color:'red';
  transition: border 0.24s ease-in-out;
`

const titleRegex = /^[a-zA-Z ]*$/
const formSchema = Yup.object({
    title: Yup.string().matches(titleRegex, 'Only alphabetic characters are allowed').max(30, 'Must be 30 characters or less').required('Title is required'),
    description: Yup.string().min(10, 'Description must be atleast 10 characters long').required('Description is required'),
    category: Yup.object().required('Category is required'),
    image: Yup.string().required('Image is required'),
});
function CreatePost() {
    const editor = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //formik
    //select store data
    const post = useSelector(state => state?.posts);
    const { isCreated, loading, appErr, serverErr } = post;
    if (isCreated) navigate('/posts')
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            image: ""
        },
        onSubmit: values => {
            //dispath the action
            const data = {
                category: values?.category?.label,
                title: values?.title,
                description: values?.description,
                image: values?.image
            }
            dispatch(createpostAction(data))

        },
        validationSchema: formSchema,
    });
    const config = {
        zIndex: 0,
        readonly: false,
        activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
        toolbarButtonSize: 'middle',
        theme: 'default',
        enableDragAndDropFileToEditor: true,
        saveModeInCookie: false,
        spellcheck: true,
        editorCssClass: false,
        triggerChangeEvent: true,
        height: 300,
        direction: 'ltr',
        language: 'en',
        debugLanguage: false,
        i18n: 'en',
        tabIndex: -1,
        toolbar: true,
        enter: 'P',
        useSplitMode: false,
        colorPickerDefaultTab: 'background',
        imageDefaultWidth: 300,
       // removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
       // disablePlugins: ['paste', 'stat'],
        events: {},
        textIcons: false,
        uploader: {
            insertImageAsBase64URI: true
        },
        placeholder: 'Start typing',
        showXPathInStatusbar: false
    }
    return (
        <>
            <div className="min-h-screen bg-[#F1F5F9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 " >
                <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md  ">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                        Create Post
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-600">
                        <p className="font-medium text-green-600 hover:text-indigo-500">
                            Share your ideas to the word.
                        </p>
                    </p>
                    {appErr || serverErr ? (
                        <p className="mt-2 text-center text-lg text-red-600">
                            {serverErr} {appErr}
                        </p>
                    ) : null}
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full  lg:w-3/4 border-none rounded-xl">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <div className="mt-1">
                                    {/* Title */}
                                    <input
                                        value={formik?.values?.title}
                                        onChange={formik?.handleChange("title")}
                                        onBlur={formik?.handleBlur("title")}
                                        id="title"
                                        name="title"
                                        type="title"
                                        autoComplete="title"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/* Err msg */}
                                <div className="text-red-500">
                                    {formik.touched.title && formik.errors.title}
                                </div>
                            </div>
                            <CategoryDropDown
                                value={formik.values.category?.label}
                                onChange={formik.setFieldValue}
                                onBlur={formik.setFieldTouched}
                                error={formik.errors.category}
                                touched={formik.touched.category}
                            />
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                {/* Description */}
                                <JoditEditor
                                    
                                    ref={editor}
                                    value={formik?.values?.description}
                                    onChange={formik?.handleChange("description")}
                                    onBlur={formik?.handleBlur("description")}
                                   // config={config}
                                    
                                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                                    type="text"
                                />
                                {/* <textarea
                                    value={formik.values.description}
                                    onChange={formik.handleChange("description")}
                                    onBlur={formik.handleBlur("description")}
                                    rows="5"
                                    cols="10"
                                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                                    type="text"
                                ></textarea> */}
                                {/* Err msg */}
                                <div className="text-red-500">
                                    {formik.touched.description && formik.errors.description}
                                </div>
                                {/* Image component */}
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium mt-3 mb-2 text-gray-700"
                                >
                                    Select image to upload
                                </label>
                                <Container className="container bg-gray-700">
                                    <Dropzone
                                        onBlur={formik.handleBlur("image")}
                                        accept="image/jpeg, image/jpg, image/png"
                                        onDrop={acceptedFiles => {
                                            formik.setFieldValue("image", acceptedFiles[0]);
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <div className="container">
                                                <div
                                                    {...getRootProps({
                                                        className: "dropzone",
                                                        onDrop: event => event.stopPropagation(),
                                                    })}
                                                >
                                                    <input {...getInputProps()} />
                                                    <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                                                        Click here to select image
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                </Container>
                            </div>
                            <div>
                                {/* Submit btn */}
                                {loading ? (
                                    <button
                                        disabled
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Loading please wait...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost