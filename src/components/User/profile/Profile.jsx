import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    HeartIcon,
    EmojiSadIcon,
    UploadIcon,
    UserIcon,
} from "@heroicons/react/outline";
import { FcApproval } from "react-icons/fc";
import DateFormater from '../../../utils/DateFormater'
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import { userProfileAction, followUserAction, unFollowUserAction } from "../../../redux/slices/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export default function Profile() {
    const { id } = useParams()
    const dispatch = useDispatch()


    const {
        profile,
        profileLoading,
        profileServerErr,
        profileAppErr,
        followed,
        unFollowed,
        userAuth } = useSelector((state) => state.users)


    const isLoggedUser = userAuth?._id === id
    let isFollowing;
    profile?.followers?.forEach((row) => {
        if (row?._id.toString() === userAuth?._id.toString()) isFollowing = true
        else isFollowing = false
    })
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState('My Followers')
    useEffect(() => {
        dispatch(userProfileAction(id))
    }, [dispatch, id, followed, unFollowed])
    return (
        <>
            {/* {profileLoading ? <LoadingSpinner /> : */}
            {profileAppErr || profileServerErr ?
                <h2 className="flex items-center justify-center w-full h-full text-red-700 text-3xl">
                    {profileServerErr} {profileAppErr}
                </h2> :
                <div className="h-screen flex overflow-hidden bg-white ">
                    <div className="hidden sm:block absolute top-24 left-0 m-3 z-10">
                        {profile?.isAccountVerified ? <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-400 hover:bg-green-600 text-white">
                            Verified Account
                        </span> : <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                            Unverified Account
                        </span>}
                    </div>
                    {/* Static sidebar for desktop */}
                    <div className="flex flex-col min-w-0 flex-1 overflow-hidden  mt-20">
                        <div className="flex-1 relative z-0 flex overflow-hidden">
                            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                                <article>
                                    {/* Profile header */}
                                    <div>
                                        <div className="relative">
                                            <p className=" text-lg text-white absolute top-0 right-0 m-4">
                                                <div className="hidden sm:block bg-gray-100 bg-opacity-25 py-2 px-2 hover:bg-gray-500 border-none rounded-lg mb-2">
                                                    Date Joined:
                                                    <DateFormater date={profile?.createdAt} />{" "}
                                                </div>
                                                {isLoggedUser && <div>
                                                    {/* Upload banner photo */}
                                                    <Link
                                                        to={`/upload-profile-photo`}
                                                        state={{
                                                            banner: true
                                                        }}
                                                        className="ml-28 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white bg-opacity-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                    >
                                                        <UploadIcon
                                                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        <span>Change</span>
                                                    </Link>
                                                </div>}

                                            </p>

                                            <img
                                                className="h-40 w-full object-cover lg:h-64"
                                                src={profile?.bannerPhoto}
                                                alt={profile?.fullName}
                                            />
                                        </div>
                                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                                <div className="flex -mt-20">
                                                    <img
                                                        className="z-10 h-24 w-24 rounded-full  ring-4 ring-white sm:h-52 sm:w-52 lg:w-60 lg:h-60"
                                                        src={profile?.profilePhoto}
                                                        alt={profile?.fullName}
                                                    />
                                                </div>
                                                <div className=" mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                                    <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                                                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                                            {profile?.fullName}

                                                            {profile?.accountType ? <FcApproval /> : null}

                                                            {/* Display if verified or not */}

                                                        </h1>

                                                        <div className="flex  space-x-2 ">
                                                            {isLoggedUser && <button
                                                                onClick={() => {
                                                                    setData(profile?.viewedBy)
                                                                    setDisplayData('Who Viewed My Profile')
                                                                }}
                                                                className="cursor-pointer   text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500    ">
                                                                {profile?.viewedBy?.length} Profile View

                                                            </button>}
                                                            <button
                                                                onClick={() => {
                                                                    setData(profile?.followers)
                                                                    setDisplayData('My Followers')
                                                                }}
                                                                className="cursor-pointer  text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ">

                                                                {profile?.followers?.length} followers
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setData(profile?.following)
                                                                    setDisplayData('Folloing Profiles')
                                                                }}
                                                                className="cursor-pointer  text-blue-600 mt-2 mb-2 py-1  px-2 border rounded-lg hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ">

                                                                {profile?.following?.length} following
                                                            </button>
                                                        </div>


                                                        {/* is login user */}
                                                        {/* Upload profile photo */}
                                                        {isLoggedUser && <Link
                                                            to={`/upload-profile-photo`}
                                                            state={{
                                                                banner: false
                                                            }}
                                                            className="inline-flex justify-center w-full sm:w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                        >
                                                            <UploadIcon
                                                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            <span>Upload Photo</span>
                                                        </Link>}

                                                    </div>
                                                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                                        {/* // Hide follow button from the same */}
                                                        {!isLoggedUser && (
                                                            <div>
                                                                {isFollowing ? (
                                                                    <button
                                                                        onClick={() =>
                                                                            dispatch(unFollowUserAction(id))
                                                                        }
                                                                        className="mr-2 inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                                    >
                                                                        <EmojiSadIcon
                                                                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span>Unfollow</span>
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() =>
                                                                            dispatch(followUserAction(id))
                                                                        }
                                                                        type="button"
                                                                        className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                                    >
                                                                        <HeartIcon
                                                                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span>Follow </span>
                                                                    </button>
                                                                )}

                                                                <></>
                                                            </div>
                                                        )}
                                                        {/* Update Profile */}
                                                        {isLoggedUser ? <Link
                                                            to={`/update-profile/${profile?._id}`}
                                                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                        >
                                                            <UserIcon
                                                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            <span>Update Profile</span>
                                                        </Link> : null}
                                                        {/* Send Mail */}
                                                        {!isLoggedUser ? <Link
                                                            to={`/send-mail`}
                                                            state={{
                                                                email: profile?.email,
                                                                id: profile?._id,
                                                            }}
                                                            className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                        >
                                                            <MailIcon
                                                                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="text-base mr-2  text-bold text-yellow-500">
                                                                Send Mail
                                                            </span>
                                                        </Link> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block 2xl:hidden mt-10 min-w-0 flex-1">
                                                {/* <h1 className="text-2xl font-bold text-gray-900 truncate">
                                                    {profile?.fullName}
                                                </h1> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tabs */}
                                    <div className="mt-8 sm:mt-12 2xl:mt-20 opacity-10 mb-10">
                                        <div className="border-b border-red-900">
                                            <div className="max-w-5xl mx-auto "></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center place-items-start flex-wrap  md:mb-0 m-10 border-2 bg-gray-50 rounded-xl">
                                        <div className="w-full md:w-1/3 px-10 mb-4 md:mb-0  ">
                                            <h1 className="text-center font-serif  px-10 text-xl mt-6 mb-6">
                                                {displayData} : {data?.length ? data?.length : profile?.followers?.length}
                                            </h1>
                                            {/* Who view my post */}
                                            <div className="bg-white p-10 border-none rounded-xl mb-10">
                                            <ul className="">
                                                {data?.length <= 0 ? (
                                                    profile?.followers?.map(user => (
                                                        <li>
                                                            <Link to={`/profile/${user?._id}`}>
                                                                <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                                                    <img
                                                                        className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                                                        src={user?.profilePhoto}
                                                                        alt={user?.fullName}
                                                                    />
                                                                    <div className="font-medium text-lg leading-6 space-y-1 flex">
                                                                        <h3>
                                                                            {user?.fullName}
                                                                        </h3>
                                                                        <p className="text-indigo-600 ">
                                                                            {user?.accountType ? <FcApproval /> : null}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    data?.map(user => (
                                                        <li>
                                                            <Link to={`/profile/${user?._id}`}>
                                                                <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                                                    <img
                                                                        className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                                                        src={user?.profilePhoto}
                                                                        alt={user?.fullName}
                                                                    />
                                                                    <div className="font-medium text-lg leading-6 space-y-1 flex">
                                                                        <h3>
                                                                            {user?.fullName}
                                                                        </h3>
                                                                        <p className="text-indigo-600 ">
                                                                            {user?.accountType ? <FcApproval /> : null}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                        {/* All my Post */}
                                        <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0 ">
                                            <h1 className="text-center font-serif px-10 text-xl mt-6 mb-6 ">
                                                My Post - {profile?.posts?.length}
                                            </h1>
                                            {/* Loop here */}
                                            {profile?.posts?.length <= 0 ? (
                                                <h2 className="text-center text-xl">
                                                    No Post Found
                                                </h2>
                                            ) : (
                                                profile?.posts?.map(
                                                    (post) => (
                                                        <div
                                                            key={post._id}
                                                            className="flex flex-wrap   mt-3  lg:mb-6 border p-4 rounded-xl"
                                                        >
                                                            <div className="mb-2   w-full lg:w-1/4">
                                                                <Link to={`/posts/${post?._id}`}>
                                                                    <img
                                                                        className="object-cover h-40 rounded"
                                                                        src={
                                                                            post?.image
                                                                        }
                                                                        alt="poster"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="w-full lg:w-3/4">
                                                                <Link
                                                                    to={`/posts/${post?._id}`}
                                                                    className="hover:underline"
                                                                >
                                                                    <h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
                                                                        {
                                                                            post?.title
                                                                        }
                                                                    </h3>
                                                                </Link>
                                                                <p className="text-gray-600 truncate">
                                                                    {
                                                                        post?.description
                                                                    }
                                                                </p>
                                                                <Link
                                                                    className="text-indigo-500 hover:underline"
                                                                    to={`/posts/${post?._id}`}
                                                                >Read More...
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </main>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
