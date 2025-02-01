"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

const Tiptap = ({ content, onChange }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: `w-full h-full p-2 outline-black border border-gray-200  rounded-lg `,
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getText());
    },
  });
  useEffect(() => {
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);
  return (
    <div>
      <Toolbar editor={editor} content={content} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
