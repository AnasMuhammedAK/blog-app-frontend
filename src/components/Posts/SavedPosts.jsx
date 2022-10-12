import { TrashIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savedPostsAction,deleteSavedPostsAction } from "../../redux/slices/posts/postSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function SavedPosts() {
    const posts = useSelector(state => state?.posts);
    const { savedList, loading, appErr, serverErr,deleted,savedPost } = posts
    //console.log(savedList[0]?.post, "hhhhhhhhh");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(savedPostsAction())
    }, [dispatch,deleted,savedPost])
    return (
        <>
            {loading ? <LoadingSpinner /> :
                appErr || serverErr ?
                    <p className="mt-2 text-center text-lg text-red-600">
                        {serverErr} {appErr}
                    </p> :
                    savedList[0]?.post?.length <= 0 ? <div className="mt-60 w-full h-full text-black flex items-center justify-center ">No Post Found</div> :
                        <div className="px-32 py-12 mt-20">
                            {/* Desktop Responsive Start */}
                            <div className="hidden sm:flex flex-col justify-start items-start">
                                <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
                                    <h1 className="text-4xl font-semibold leading-9 text-gray-800">Saved Posts</h1>
                                    <p className="text-base leading-4 text-gray-600 pb-1">({savedList[0]?.post?.length})</p>
                                </div>
                                <table className="w-full mt-16 whitespace-nowrap">
                                    <thead aria-label="table heading" className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b ">
                                        <tr>
                                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">Image</th>
                                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">Title</th>
                                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">Category</th>
                                            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">Details</th>
                                            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" >More Options</th>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full text-left">
                                        {savedList[0]?.post?.map((post, index) => {
                                            return (
                                                <tr key={index} className="border-gray-200 border-b ">
                                                    <th>
                                                        <img className="my-10 pl-4 lg:pl-10 2xl:pl-20" src={post?.image} alt="shoe" />
                                                    </th>
                                                    <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                                        <p className=" text-base leading-4 text-gray-800">{post?.title}</p>
                                                    </th>
                                                    <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                                                        <p className>{post?.category}</p>
                                                    </th>
                                                    <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                                                        <Link to={`/posts/${post?._id}`} className="text-indigo-500 hover:underline">
                                                            <p className="text-blue-700 cursor-pointer">Read More..</p>
                                                        </Link>
                                                    </th>
                                                    <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                                                        <button onClick={()=>dispatch(deleteSavedPostsAction(post?._id))} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                                                        <TrashIcon class="h-8  text-red-600" />
                                                        </button>
                                                    </th>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                            {/* Desktop Responsive End */}
                            {/* Mobile Responsive Start */}
                            <div className=" flex justify-center items-center">
                                <div className="sm:hidden flex flex-col justify-start items-start ">
                                    <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
                                        <p className="text-4xl font-semibold leading-9 text-gray-800">Favourites</p>
                                        <p className="text-base leading-4 text-gray-600 pb-1">(12 Items)</p>
                                    </div>
                                    {savedList[0]?.post?.map((post, index) => {
                                        return (
                                            <div key={index} className="border-gray-200 border-b pb-10">
                                                <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                                                    <div>
                                                        <img src={post?.image} alt="shoe" />
                                                    </div>
                                                </div>
                                                <div className="px-4 mt-6 flex justify-between w-full  jusitfy-center items-center">
                                                    <div>
                                                        <p className="w-36 text-base leading-6 text-gray-800">{post?.title}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-semibold leading-4 text-gray-800">{post?.category}</p>
                                                    </div>
                                                </div>
                                                <div className="px-4 mt-6 flex justify-between w-full  jusitfy-center items-center">
                                                    <div>
                                                        <Link to={`/posts/${post?._id}`} className="text-indigo-500 hover:underline">
                                                            <p className="text-blue-700 cursor-pointer">Read More..</p>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <button className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800">
                                                            <p>Remove Item</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* Mobile Responsive End */}
                        </div>}

        </>

    );
}
