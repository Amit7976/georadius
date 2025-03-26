"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GrMicrophone } from "react-icons/gr";
import { RiUploadCloud2Line } from "react-icons/ri";

// ✅ Zod Validation Schema
const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    images: z
        .array(z.instanceof(File))
        .max(3, "You can only upload up to 3 images")
        .refine((files) => files.every((file) => file.size <= 2 * 1024 * 1024), {
            message: "Each image must be 2MB or less",
        })
        .optional(),
});

function MainContent() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    // ✅ Setup Form with Zod Validation
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            images: [],
        },
    });

    // ✅ Handle File Selection with Validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        let selectedFiles = Array.from(files);

        // Max 3 images allowed
        if (selectedFiles.length + selectedImages.length > 3) {
            alert("You can only select up to 3 images.");
            return;
        }

        // Filter out large files (>2MB)
        const validFiles = selectedFiles.filter((file) => file.size <= 2 * 1024 * 1024);
        if (validFiles.length < selectedFiles.length) {
            alert("Some files are too large (Max 2MB per file).");
        }

        setSelectedImages((prev) => [...prev, ...validFiles]);
        setValue("images", [...selectedImages, ...validFiles]); // Update form state
    };

    // ✅ Remove Image
    const removeImage = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setValue("images", updatedImages);
    };

    // ✅ Form Submission
    const onSubmit = (values: any) => {
        console.log("Submitted Data:", values);
        reset();
        setSelectedImages([]);
    };

    return (
        <>
            <div className="text-center py-10 px-6 space-y-3">
                <h1 className="text-2xl font-extrabold text-black">Post a New News</h1>
                <p className="text-lg font-medium text-gray-500">
                    Share the latest updates with the world!
                </p>
            </div>

            <div className="p-5 space-y-10">
                {/* Title Input */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-5">
                        <Label className="text-lg font-bold text-black">
                            News Title <span className="text-red-500">*</span>
                        </Label>
                        <GrMicrophone className="text-2xl active:scale-75 duration-300" />
                    </div>
                    <Input
                        className="h-14 ring-2 ring-gray-400 font-bold focus-visible:ring-green-500 focus-visible:outline-0 focus-visible:border-0"
                        type="text"
                        placeholder="Enter News Title"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                {/* Description Input */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-5">
                        <Label className="text-lg font-bold text-black">
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <GrMicrophone className="text-2xl active:scale-75 duration-300" />
                    </div>
                    <Textarea
                        className="h-40 ring-2 ring-gray-400 focus-visible:ring-green-500 focus-visible:outline-0 focus-visible:border-0"
                        placeholder="Describe the news in detail..."
                        {...register("description")}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                    <Label className="text-lg font-bold text-black">Upload Media Files</Label>
                    <div className="relative">
                        <div className={`${(selectedImages.length == 0) ? "h-40" : "h-20"} border-2 flex items-center justify-center flex-col gap-2 rounded-lg`}>
                            <RiUploadCloud2Line className="text-3xl" />
                            <p className="text-gray-500 text-xs">Max file size: 2MB, up to 3 images</p>
                        </div>
                        <Input
                            className={`absolute top-0 opacity-0 ${(selectedImages.length == 0) ? "h-40" : "h-20"}`}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/* Image Preview */}
                    {selectedImages.length > 0 && (
                        <div className="gap-2 mt-3 flex-wrap grid grid-cols-3">
                            {selectedImages.map((img, index) => (
                                <div key={index} className="relative col-span-1 h-40 object-cover">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`preview-${index}`}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white font-extrabold rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        onClick={() => removeImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                    size={100}
                    variant={"primary"}
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-green-600 active:bg-green-400 active:scale-95 duration-300 h-16 text-white text-lg font-bold rounded-lg"
                >
                    Post News
                </Button>
            </div>
        </>
    );
}

export default MainContent;
