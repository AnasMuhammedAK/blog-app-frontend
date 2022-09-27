import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchAllCategories } from "../../redux/slices/Category/categorySlice";


const CategoryDropDown = props => {
    console.log(props);
    //dispatch action
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);
    //select categories
    const category = useSelector(state => state?.category);
    const { categoryList, loading, appErr, serverErr } = category;

    const allCategories = categoryList?.map(category => {
        return {
            label: category?.title,
            value: category?._id,
        };
    });

    //handleChange
    const handleChange = value => {
        props.onChange("category", value);
    };
    //handleBlur
    const handleBlur = () => {
        props.onBlur("category", true);
    };
    return (
        <div style={{ margin: "1rem 0" }}>
            {loading ? (
                <h3 className="text-base text-green-600">
                    Post categories list are loading please wait...
                </h3>
            ) : (
                <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="category"
                    options={allCategories}
                    value={props?.value?.label}
                />
            )}
            {/* Display */}
            {props?.error && (
                <div className="text-red-500" style={{ marginTop: ".5rem" }}>{props?.error}</div>
            )}
        </div>
    );
};

export default CategoryDropDown;