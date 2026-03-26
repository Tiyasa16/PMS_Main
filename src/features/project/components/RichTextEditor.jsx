import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function EditorPreview({value, onChange}) { // Change setValue to onChange
    
    return (
        <div className=" ">
            
                    {/* Rich Text Editor */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-[#002d74] mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <div className="rounded-lg border border-gray-300 overflow-hidden transition-all duration-200 bg-white focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-[#002d74]">
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={onChange} // Change setValue to onChange
                                placeholder="Enter project description..."
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, 3, false] }],
                                        ["bold", "italic", "underline", "strike"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        ["blockquote", "code-block"],
                                        ["link", "image"],
                                        ["clean"],
                                    ],
                                }}
                                className="[&_.ql-editor]:min-h-50 [&_.ql-editor]:text-[#002d74] [&_.ql-editor]:leading-relaxed"
                            />
                        </div>
                    </div>
                </div>
            
    );
}