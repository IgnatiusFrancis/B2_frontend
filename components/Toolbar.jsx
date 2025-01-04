import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Link,
} from "lucide-react";

function Toolbar({ editor, content }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border border-gray-200 p-4 flex gap-4 flex-wrap w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "text-primarycolor text-xs border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Underline className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : ` p-2`
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "text-primarycolor border-gray-500 bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Heading3 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : ` p-2`
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : ` p-2`
          }
        >
          <Quote className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : `p-2`
          }
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "text-primarycolor border-gray bg-gray-50 p-2 rounded-md"
              : ` p-2`
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
export default Toolbar;
