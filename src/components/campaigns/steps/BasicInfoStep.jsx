import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  selectDraftCampaign,
  updateDraftCampaign,
} from "../../../features/campaigns/campaignsSlice";

const CATEGORIES = [
  "Education",
  "Health",
  "Environment",
  "Disaster Relief",
  "Community",
];

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Must be 100 characters or less"),
  category: yup.string().required("Category is required"),
  shortDescription: yup
    .string()
    .required("Short description is required")
    .max(200, "Must be 200 characters or less"),
  fullStory: yup.string().required("Full story is required"),
});

const BasicInfoStep = ({ validationRef }) => {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraftCampaign);

  const { register, handleSubmit, watch, trigger, formState, setValue } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        title: draft.title || "",
        category: draft.category || "",
        shortDescription: draft.description || "",
        fullStory: draft.fullStory || draft.description || "",
      },
      mode: "onChange",
    });

  // Keep local form values in sync if draft changes externally (e.g., from Redux store updates)
  useEffect(() => {
    setValue("title", draft.title || "");

    setValue("category", draft.category || "");
    setValue("shortDescription", draft.description || "");
    setValue("fullStory", draft.fullStory || draft.description || "");
  }, [draft, setValue]);

  // Debounced autosave to Redux when form values change
  const timeoutRef = useRef(null);
  const watched = watch();
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(
        updateDraftCampaign({
          title: watched.title || "",
          category: watched.category || "",
          description: watched.shortDescription || "",
          fullStory: watched.fullStory || "",
        }),
      );
    }, 550);
    return () => clearTimeout(timeoutRef.current);
  }, [watched, dispatch]);

  // Expose a validate function to parent via validationRef
  useEffect(() => {
    if (!validationRef) return;
    validationRef.current = {
      validate: async () => {
        const valid = await trigger();
        if (valid) {
          // ensure final save before proceeding
          const values = await handleSubmit((vals) => vals)();
          dispatch(
            updateDraftCampaign({
              title: values.title,
              category: values.category,
              description: values.shortDescription,
              fullStory: values.fullStory,
            }),
          );
        }
        return valid;
      },
    };
    return () => {
      if (validationRef.current && validationRef.current.validate) {
        validationRef.current = null;
      }
    };
  }, [validationRef, trigger, handleSubmit, dispatch]);

  const title = watch("title") || "";
  const shortDescription = watch("shortDescription") || "";

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Campaign Title
        </label>
        <input
          id="title"
          type="text"
          maxLength={100}
          {...register("title")}
          placeholder="e.g. Clean Water Initiative"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
          <span>
            {formState.errors.title ? formState.errors.title.message : ""}
          </span>
          <span>{title.length}/100</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="mt-1 text-xs text-slate-500">
          {formState.errors.category?.message || ""}
        </div>
      </div>

      <div>
        <label
          htmlFor="shortDescription"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Short Description
        </label>
        <textarea
          id="shortDescription"
          rows={3}
          maxLength={200}
          {...register("shortDescription")}
          placeholder="A short summary for listings..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
          <span>
            {formState.errors.shortDescription
              ? formState.errors.shortDescription.message
              : ""}
          </span>
          <span>{shortDescription.length}/200</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="fullStory"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Full Story
        </label>
        <textarea
          id="fullStory"
          rows={8}
          {...register("fullStory")}
          placeholder="Write the full story for your campaign. You can include formatting in a later iteration."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-accent focus:ring-accent"
        />
        <div className="mt-1 text-xs text-slate-500">
          {formState.errors.fullStory?.message || ""}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
