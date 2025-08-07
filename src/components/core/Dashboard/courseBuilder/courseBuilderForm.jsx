import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import {
    createSection,
    updateSection,
} from "../../../../services/operations/courseDetailsAPI"
import NestedView from './NestedView';

function CourseBuilderForm() {
    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleBack = () => {
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }

    const handleNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Add at least one section to the course");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Add at least one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }

    const clearEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection({
                sectionName : data.sectionName,
                sectionId : editSectionName,
                courseId : course._id,
            },token
            )
        }else{
            result = await createSection({
                sectionName : data.sectionName,
                courseId : course._id,
            },token)
        }

        if(result){
            // console.log("Result..",result)
            dispatch(setCourse(result));
            dispatch(setEditCourse(false));
            setValue("sectionName","");
            setEditSectionName(null); 
        }
        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId){
            clearEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        type="text"
                        placeholder='Add a section to build your course'
                        {...register("sectionName", {
                            required: true,
                        })}
                        className="form-style w-full"
                    />
                    {
                        errors.sectionName &&
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    }
                </div>
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        type='submit'
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {
                        editSectionName &&
                        <button
                            type='button'
                            onClick={clearEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    }
                </div>
            </form>
            {
                course.courseContent.length > 0 &&
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            }
            <div className="flex justify-end gap-x-3">
                <button
                    type="button"
                    onClick={handleBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onclick={handleNext}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm