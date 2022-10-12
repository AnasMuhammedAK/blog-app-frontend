import React, { useEffect, useState } from "react";
import poster from "../../images/home.png";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../../redux/slices/posts/postSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  const { postLists, loading, appErr, serverErr } = useSelector(state => state?.posts);
  console.log(postLists)
  // const [posts, setPosts] = useState([])
  // setPosts(postLists)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPostsAction())
  }, [1])


  return (
    <>
      <section className="pb-10 pt-32 bg-slate-100">
        <div className="max-h-[650px] relative container px-4   mx-auto">
          <div className="flex flex-wrap items-center mx-4 ">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-lg font-bold text-blue-500 ml-2">
                Create posts to educate
              </span>
              <h2 className="max-w-2xl mt-8 mb-12 text-6xl 2xl:text-8xl text-black font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-green-400">By creating a post</span>
              </h2>
              {/* <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-500">
                Your post must be free from racism and unhealthy words
              </p> */}
            </div>
            <div className="hidden w-full lg:block lg:w-1/2   px-4">
              <img className="" src={poster} alt={poster} />
            </div>
          </div>
        </div>
        {/* blogs demo */}
        {!postLists?.length > 0 ? '':
          loading ? <LoadingSpinner /> :
            <div className="container mx-auto px-4">
              <h1 className="text-5xl text-center f-m-w  font-bold pt-0">Our Blogs</h1>
              <div className="pt-14 xl:px-0 px-4">
                <div className="w-full lg:flex">
                  <div className="lg:w-1/2">
                    <div>
                      <img src={postLists[0]?.image} className="w-3/4 rounded-xl" />
                      <div className="mt-8 lg:mb-0 mb-8">
                        <h1 className="f-m-m text-2xl font-semibold leading-7">{postLists[0]?.title}</h1>
                        <div style={{ ove0rflow: "hidden", textOverflow: "ellipsis", maxHeight: '150px' }} class="text-black" dangerouslySetInnerHTML={{ __html: postLists[0]?.description }}>
                        </div>
                        <div className="mt-6">
                          <a href>
                            <p className="text-indigo-700 underline text-base font-semibold f-m-m">Read More</p>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>


                  <div className="lg:w-1/2 lg:ml-8">
                    {postLists?.slice(1, 4)?.map((post, index) => {
                      return (
                        <div key={index} className="lg:flex items-start mb-8">
                          <img src={post.image} className="w-1/3 rounded-xl" />
                          <div className="lg:ml-6">
                            <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">{post?.title}</h1>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", maxHeight: '150px' }} class="text-black" dangerouslySetInnerHTML={{ __html: post?.description }}>
                            </div>
                            <div className="mt-4">
                              <Link to={`/posts/${post?._id}`}>
                                <p className="text-indigo-700 underline text-base font-semibold f-m-m">Read More</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* <div className="lg:flex items-start mb-8">
                      <img src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog3.png" className="w-full" />
                      <div className="lg:ml-6">
                        <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">My life’s a Movie</h1>
                        <p className="text-base f-m-m leading-loose mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div className="mt-4">
                          <a href>
                            <p className="text-indigo-700 underline text-base font-semibold f-m-m">Read More</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex items-start mb-8">
                      <img src="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png" className="w-full" />
                      <div className="lg:ml-6">
                        <h1 className="f-m-m text-2xl font-semibold leading-7 lg:mt-0 mt-8">Lilii’s Travel Plans</h1>
                        <p className="text-base f-m-m leading-loose mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div className="mt-4">
                          <a href>
                            <p className="text-indigo-700 underline text-base font-semibold f-m-m">Read More</p>
                          </a>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center my-16 w-full">
                <Link to={'/posts'}>
                  <button className=" hover:bg-gray-200  border-indigo-700 border-2 lg:text-2xl md:text-lg text-sm rounded f-m-m font-semibold text-indigo-700 focus:outline-none lg:px-12 px-6 lg:py-6 py-3 xl:leading-4">Browse More</button>
                </Link>
              </div>
              <div />
            </div>}

      </section>

    </>
  );
};

export default HomePage;