import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { FcApproval } from "react-icons/fc";
import {
    blockUserAction,
    unBlockUserAction,
} from "../../../redux/slices/users/usersSlice";

const UsersListItem = (user) => {
    //navigate
    const navigate = useNavigate();
    // dispatch
    const dispatch = useDispatch();
    //Redirect
    const sendMailNavigator = () => {
        navigate("/send-mail", {
            pathName: "/send-mail",
            state: { email: user?.user?.email, id: user?.user?._id },
        });
    };

    return (
        <>
            <div className="p-8 mb-4 bg-white shadow rounded">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
                        <img
                            className="w-10 h-10 mr-4 object-cover rounded-full"
                            src={user?.user?.profilePhoto}
                            alt="profile "
                        />
                        <div>
                            <p className="text-sm font-medium flex items-center">
                                {user?.user?.fullName} {user?.user?.accountType ? <FcApproval /> : null}
                            </p>
                            <p className="text-xs text-gray-500">{user?.user?.email}</p>
                            <span>{user?.user?.isAccountVerified ? <p className="text-red-600 text-xs">Account Not Verified</p> : <p className="text-green-500 text-xs">Account Verified</p>}</span>
                        </div>
                    </div>
                    <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
                        <p className="flex items-center justify-center space-x-2 py-1 px-2 text-xs  bg-purple-100 rounded-full">
                            {}
                           
                            <span>{user?.user?.isBlocked ? <p className="text-red-600">Blocked</p> : <p className="text-green-500">Active</p>}</span>
                        </p>
                    </div>
                    <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
                        <p className="text-sm font-medium">
                            <span className="text-base mr-2  text-bold text-yellow-500">
                                {user.user?.followers?.length}
                            </span>
                    followers
                        </p>
                        <p className="text-sm font-medium">
                            <span className="text-base mr-2  text-bold text-yellow-500">
                                {user.user?.following?.length}
                            </span>
                            following
                        </p>
                    </div>
                    <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
                        <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 border-gray-400 rounded">
                            <span className="text-base mr-2  boder-2  text-bold text-yellow-500">
                                {user.user?.posts?.length} - Posts
                            </span>
                        </p>
                        <Link
                            to={`/profile/${user?.user?._id}`}
                            className=" text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-gray-400 rounded hover:bg-gray-500 hover:text-white"
                        >
                            <p className=" pt-1">Profile</p>
                        </Link>

                        {user?.user?.isBlocked ? (
                            <button
                                onClick={() =>
                                    dispatch(unBlockUserAction(user?.user?._id))
                                }
                                className="inline-block py-1 px-2 text-center bg-green-500 hover:bg-green-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                            >
                                Unblock
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    dispatch(blockUserAction(user?.user?._id))
                                }
                                className="inline-block py-1 px-2 text-center bg-red-500 hover:bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                            >
                                Block
                            </button>
                        )}

                        <button
                            onClick={sendMailNavigator}
                            className="inline-flex items-center justify-center bg-blue-500 px-2   border border-black shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                            <MailIcon
                                className="ml-1 mr-2 h-5 w-5 text-gray-200"
                                aria-hidden="true"
                            />
                            <span className="text-base mr-2  text-bold text-yellow-500">
                                Send Mail
                            </span>
                        </button>
                    </div>
                    <div className="w-full lg:w-1/12 px-4">
                        <div className="flex items-center">
                            {/* Send Mail */}
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersListItem;