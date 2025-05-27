"use client";

import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { MAX_FILE_SIZE, VALID_FILE_TYPES } from "@/lib/constants";

const FileUpload = ({
    onSuccess,
}: {
    onSuccess: (response: IKUploadResponse) => void;
}) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (error: { message: string }) => {
        setError(error.message);
        setUploading(false);
    };

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false);
        setError(null);
        onSuccess(response);
    };

    const handleUploadStart = () => {
        setUploading(true);
        setError(null);
    };

    const handleValidateFile = (file: File) => {
        if (!VALID_FILE_TYPES.includes(file.type)) {
            setError("Invalid file type");
        }
        if (file.size > MAX_FILE_SIZE) {
            setError("File size is too large");
        }
        return true;
    };

    return (
        <div>
            <IKUpload
                fileName="test-product.png"
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleUploadStart}
                validateFile={handleValidateFile}
            />

            {uploading && (
                <p className="text-center text-sm text-gray-600">
                    Uploading...
                </p>
            )}

            {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;
