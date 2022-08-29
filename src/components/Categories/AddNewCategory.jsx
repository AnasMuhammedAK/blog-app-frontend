import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux'
import  { createCategory } from '../../redux/slices/Category/categorySlice'
import { useFormik } from "formik";
import * as Yup from "yup";

const titleRegex = /^[a-zA-Z ]*$/
const formSchema = Yup.object({
  title: Yup.string().matches(titleRegex, 'Only alphabetic characters are allowed').max(50, 'Must be 50 characters or less').required('Title is required'),
})
const AddNewCategory = () => {
// take state from store
const { appErr,serverErr} = useSelector(state => state.category)
console.log(appErr, serverErr)
    //dispatch
    const dispatch = useDispatch()
    //formik
    const formik = useFormik({
      initialValues: {
        title: "",
      },
      onSubmit: values => {
        console.log(values);
        //dispath the action
        dispatch(createCategory(values));
  
      },
      validationSchema: formSchema,
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            { (appErr || serverErr) ?
            <h1 className="mt-2 text-center text-sm text-red-500 ">{serverErr} - {appErr}</h1>
             : null}
          </p>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
               value={formik.values.title}
               onChange={formik.handleChange("title")}
               onBlur={formik.handleBlur("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusCircleIcon
                    className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Add new Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;