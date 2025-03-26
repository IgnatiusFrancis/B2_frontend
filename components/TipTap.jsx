// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Toolbar from "./Toolbar";
// import Underline from "@tiptap/extension-underline";
// import { useEffect } from "react";

// const Tiptap = ({ content, onChange }) => {
//   const handleChange = (newContent) => {
//     onChange(newContent);
//   };
//   const editor = useEditor({
//     extensions: [StarterKit, Underline],
//     editorProps: {
//       attributes: {
//         class: `w-full h-full p-2 outline-black border border-gray-200  rounded-lg `,
//       },
//     },
//     onUpdate: ({ editor }) => {
//       handleChange(editor.getText());
//     },
//   });
//   useEffect(() => {
//     if (editor && content !== editor.getText()) {
//       editor.commands.setContent(content);
//     }
//   }, [editor, content]);
//   return (
//     <div>
//       <Toolbar editor={editor} content={content} />
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default Tiptap;

// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Toolbar from "./Toolbar";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import { useEffect } from "react";

// const Tiptap = ({ content, onChange }) => {
//   const handleChange = (newContent) => {
//     onChange(newContent);
//   };

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         link: false, // Disable default link extension
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: true,
//         autolink: true,
//         HTMLAttributes: {
//           class: "text-blue-500 underline cursor-pointer",
//         },
//       }),
//     ],
//     editorProps: {
//       attributes: {
//         class: `w-full h-full p-2 outline-black border border-gray-200 rounded-lg`,
//       },
//     },
//     onUpdate: ({ editor }) => {
//       handleChange(editor.getHTML()); // Preserve rich text formatting
//     },
//   });

//   useEffect(() => {
//     if (editor && content !== editor.getHTML()) {
//       editor.commands.setContent(content);
//     }
//   }, [editor, content]);

//   return (
//     <div>
//       <Toolbar editor={editor} />
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default Tiptap;

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

const Tiptap = ({ content, onChange }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // Disable default link extension
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: `w-full h-full p-2 outline-black border border-gray-200 rounded-lg`,
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML()); // Preserve rich text formatting
    },
    immediatelyRender: false, // Fix SSR hydration issue
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div>
      {editor && <Toolbar editor={editor} />}{" "}
      {/* Prevent rendering before editor is ready */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
