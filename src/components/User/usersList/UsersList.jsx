import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlice";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
    // dispatch
    const dispatch = useDispatch()
    // data from store
    const users = useSelector(state => state?.users)
    const { userList, appErr, serverErr, loading, block, unblock } = users
    console.log(users)
    // fetch all users
    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [dispatch, block, unblock])

    return (
        <>
            <UsersListHeader users={userList} />
            <section className="py-8 bg-[#F1F5F9] min-h-screen">
                {loading ? (
                    <LoadingSpinner />
                ) : appErr || serverErr ? (
                    <h3 className="text-yellow-600 text-center text-lg">
                        {serverErr} {appErr}
                    </h3>
                ) : userList?.length <= 0 ? (
                    <h2 className="w-full h-full flex items-center justify-center text-2xl">No User Found</h2>
                ) : (
                    userList?.map((user) => (
                        <>
                            <div class="container px-4 mx-auto">
                                <UsersListItem key={user?._id} user={user} />
                            </div>
                        </>
                    ))
                )}
            </section>
        </>
    );
};

export default UsersList;