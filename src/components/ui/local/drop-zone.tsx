// Dropzone.tsx
import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../card";
import { Input } from "../input";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
  initialImageUrl?: string; // Optional prop for initial image URL
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    { className, classNameWrapper, dropMessage, handleOnDrop, initialImageUrl, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(initialImageUrl ?? null);

    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
        if (files && files.length > 0) {
          setFilePreview(URL.createObjectURL(files[0]));
        }
      }
    };

    // Function to handle input change event
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      handleOnDrop(files);
      if (files && files.length > 0) {
        setFilePreview(URL.createObjectURL(files[0]));
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    // Cleanup function to revoke the object URL
    useEffect(() => {
      return () => {
        if (filePreview && !initialImageUrl) {
          URL.revokeObjectURL(filePreview);
        }
      };
    }, [filePreview, initialImageUrl]);

    // Update filePreview if initialImageUrl changes
    useEffect(() => {
      if (initialImageUrl && initialImageUrl !== filePreview) {
        setFilePreview(initialImageUrl);
      }
    }, [initialImageUrl, filePreview]);

    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs h-full"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="font-medium">{dropMessage}</span>
            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              className={cn("hidden", className)}
              onChange={handleInputChange}
            />
          </div>
          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="mt-2 max-h-40 w-auto object-cover"
            />
          )}
        </CardContent>
      </Card>
    );
  }
);

export default Dropzone;
