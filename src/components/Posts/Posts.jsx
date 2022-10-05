import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, toggleAddLikesToPost, toggleAddDisLikesToPost } from "../../redux/slices/posts/postSlice";
import DateFormatter from "../../utils/DateFormater";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { fetchAllCategories } from "../../redux/slices/Category/categorySlice";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

export default function Posts() {
  //select post from store
  const { postLists, loading, appErr, serverErr, likes, disLikes } = useSelector(state => state?.posts);
  const { categoryList, loading: catLoading, appErr: catAppErr, serverErr: catServerErr } = useSelector(state => state?.category);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPostsAction())
  }, [dispatch, likes, disLikes]);

  return (
    <>
      <section className="mt-24">
        <div class="py-20 bg-[#F1F5F9] min-h-screen radius-for-skewed">
          <div class="containehow r mx-auto px-4 relative">
            <div className="pb-10 xl:mb-0 fixed top-24 px-4  lg:top-32 left-0 right-0">
              <Search />
            </div>
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2 lg:fixed ">
                <span class="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-black lg:text-5xl font-bold font-heading ">
                  Latest Post
                </h2>
              </div>

            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 lg:fixed ">
                <div class="py-4 px-6 bg-gray-200 shadow rounded lg:overflow-hidden lg:hover:overflow-y-scroll  lg:max-h-[600px]">
                  <h4 class="mb-4 text-black font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {catLoading ? (
                      <LoadingSpinner />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.length <= 0 ? (
                      <h1>No Category Found</h1>
                    ) : (
                      <>
                        <div>
                          <p onClick={() => dispatch(fetchPostsAction())} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">
                            All Posts
                          </p>
                        </div>
                        {categoryList?.map(category => (
                          <li>
                            <p onClick={() => dispatch(fetchPostsAction(category?.title))} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gray-500">
                              {category?.title}
                            </p>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:ml-[25%] lg:w-3/4 px-3">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <p className="mt-2 text-center text-lg text-red-600">
                    {serverErr} {appErr}
                  </p>
                ) : postLists?.length <= 0 ? (

                  <div className="w-full h-full flex items-center justify-center pt-20 lg:pt-0">
                    <img className="w-1/2" src="https://cdn.dribbble.com/userupload/2905384/file/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.png?compress=1&resize=1024x768" alt="no item fount" />
                  </div>
                ) : (
                  <>
                    {postLists?.map((post, index) => (
                      <div class="flex flex-wrap bg-[#F1F5F9]  lg:mb-6 border shadow-xl border-gray-400 rounded-xl mr-10 p-10">

                        <div class="mb-10  w-full lg:w-1/4">
                          <Link to={`/posts/${post?._id}`}>
                            {/* Post image */}
                            <img
                              class="w-full h-full object-cover rounded"
                              src={post?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="flex flex-row bg-gray-300 justify-center w-full  items-center mt-2">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Togle like  */}
                              <div className="">
                                <ThumbUpIcon onClick={() => dispatch(toggleAddLikesToPost(post?._id))} className="h-7 w-7 text-indigo-600 cursor-pointer" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {post?.likes?.length ? post?.likes?.length : 0}
                              </div>
                            </div>
                            {/* Dislike */}
                            <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <ThumbDownIcon onClick={() => dispatch(toggleAddDisLikesToPost(post?._id))} className="h-7 w-7 cursor-pointer text-gray-600" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {post?.disLikes?.length
                                  ? post?.disLikes?.length
                                  : 0}
                              </div>
                            </div>
                            {/* Views */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <EyeIcon className="h-7 w-7  text-gray-400" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {post?.numViews}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full lg:w-3/4 px-3 mt-10 lg:mt-0 ">
                          <Link to={`/posts/${post?._id}`} class="text-green-400 hover:underline">
                            <h3 class="mb-1 text-2xl text-green-400 font-bold font-heading">
                              {/* {capitalizeWord(post?.title)} */}
                              {post?.title}
                            </h3>
                          </Link>
                          {/* <div className="">
                          <p class="text-black break-words ">{post?.description}</p>
                        </div> */}
                          <div style={{ overflow: "hidden", textOverflow: "ellipsis", height: '150px' }} class="text-black" dangerouslySetInnerHTML={{ __html: post?.description }}>
                          </div>
                          {/* Read more */}
                          <Link to={`/posts/${post?._id}`} className="text-indigo-500 hover:underline">
                            <p className="text-blue-700 cursor-pointer">Read More..</p>
                          </Link>
                          {/* User Avatar */}
                          <div className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                              <Link to={`/profile/${post?.user?._id}`}>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={post?.user?.profilePhoto}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                <Link to={`/profile/${post?.user?._id}`} className="text-black hover:underline ">
                                  {post?.user?.fullName}
                                </Link>
                              </p>
                              <div className="flex space-x-1 text-sm text-green-500">
                                <time>
                                  <DateFormatter date={post?.createdAt} />
                                </time>
                                <span aria-hidden="true">&middot;</span>
                              </div>
                            </div>
                          </div>
                          {/* <p class="text-gray-500">
                             Quisque id sagittis turpis. Nulla sollicitudin rutrum
                             eros eu dictum...
                           </p> */}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gray-900">
          <div class="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div> */}
      </section>
    </>
  );
}
