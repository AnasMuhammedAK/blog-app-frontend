
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { fetchAllCategories } from "../../redux/slices/Category/categorySlice";
import { Link } from "react-router-dom";
import DateFormater from "../../utils/DateFormater";

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch])
  const category = useSelector(state => state?.category);
  const { categoryList, loading, appErr, serverErr } = category

  return (
    <>
      {loading ? (
        <h2 className="text-center text-3xl text-green-800">Loading</h2>
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col mt-32">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((category,index) => {
                     
                     return(
                      <tr className="bg-gray-50" key={index}>
                       <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.user?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4 flex flex-col">
                              <div className="text-sm font-medium text-gray-900 ">
                                {category?.user?.fullName} 
                              </div>
                              <div className="text-sm text-gray-500">
                                 {category?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {< DateFormater date={category?.createdAt} />}
                        </td>
                        <Link to="/" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <PencilAltIcon className="h-5 text-indigo-500" />
                          </td>
                          </Link>
                    </tr>
                     )
                     
})}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
