import React, { useEffect, useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetailsAction, deletePostAction } from "../../redux/slices/posts/postSlice";
import DateFormater from "../../utils/DateFormater";
import DOMPurify from 'dompurify'
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AddComment from "../Comment/AddComment";
import CommentsList from "../Comment/CommentList";
import DeleteConfirm from "../Model/DeleteConfirm";

const PostDetails = () => {
    const [myComment, setMyComment] = useState('')
    const [edit, setEdit] = useState(false)
    const [commentId, setCommentId] = useState('')
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    //select post from store
    const { postDetails, loading, appErr, serverErr, isDeleted } = useSelector(state => state?.posts);
    const { userAuth } = useSelector((state) => state?.users);
    const _id = userAuth?._id;
    const canEditAndDelete = postDetails?.user?._id === _id || userAuth?.isAdmin
    const { commentCreated, loading: commentLoading, commentDeleted, commentUpdated } = useSelector(state => state?.comments);
    //alert(canEditAndDelete)
    useEffect(() => {
        if (isDeleted) navigate('/posts')
    }, [isDeleted])
    useEffect(() => {
        dispatch(fetchPostDetailsAction(id))
    }, [id, dispatch, commentCreated, commentDeleted, commentUpdated])
    // purifing out data
    const sanitizedData = (data) => ({ __html: DOMPurify.sanitize(data) })

    const editCallback = (id, description) => {
        setMyComment(description)
        setCommentId(id)
        setEdit(true)
    }
    return (
        <>
            {
                appErr || serverErr ?
                    <p className="mt-2 text-center text-lg text-red-600">
                        {serverErr} {appErr}
                    </p> :
                    <section class="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
                        <div class="container px-4 mx-auto">
                            {/* Post Image */}
                            <img
                                class="mb-24 w-full h-96 object-cover"
                                src={postDetails?.image}
                                alt=""
                            />
                            <div class="max-w-full mx-auto text-center">
                                <h2 class="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                                    {postDetails?.title}
                                </h2>

                                {/* User */}
                                <div class="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                                    <Link to={`/profile/${postDetails?.user?._id}`}>
                                        <img
                                            class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                                            src={postDetails?.user?.profilePhoto}
                                            alt=""
                                        />
                                    </Link>
                                    <div class="text-left">
                                        <Link to={`/profile/${postDetails?.user?._id}`}>
                                            <h4 class="mb-1 text-2xl font-bold text-gray-50">
                                                <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                                                    {postDetails?.user?.fullName}
                                                </span>
                                            </h4>
                                        </Link>
                                        <p class="text-gray-500">
                                            <DateFormater date={postDetails?.createdAt} />
                                        </p>
                                    </div>
                                </div>
                                {/* Post description */}
                                <div class="max-w-[80%] mx-auto">
                                    <div className="text-white text-left" dangerouslySetInnerHTML={sanitizedData(postDetails?.description)} >
                                    </div>
                                    {/* Show delete and update btn if created user */}
                                    {canEditAndDelete ? <p class="flex items-center justify-center py-3">
                                        <Link to={`/update-post/${postDetails?._id}`}>
                                            <PencilAltIcon class="h-8  text-yellow-300" />
                                        </Link>

                                        <button onClick={() => dispatch(deletePostAction(postDetails?._id))} class="ml-3">
                                            <TrashIcon class="h-8  text-red-600" />
                                        </button>
                                    </p> : null}
                                </div>
                            </div>
                        </div>
                        {/* Add comment Form component here */}
                        <div className="mt-6">
                            {/* <DeleteConfirm/> */}
                            <AddComment postId={id} description={myComment} edit={edit} commentId={commentId} />
                        </div>
                        <div className="flex justify-center  items-center">
                            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
                            {commentLoading ? <LoadingSpinner /> : <CommentsList editCallback={editCallback} comments={postDetails?.comments} />}

                        </div>
                    </section>}
        </>
    );
};

export default PostDetails;
