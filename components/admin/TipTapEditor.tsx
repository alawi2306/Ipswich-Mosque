'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExt from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

interface Props {
  value?: object
  onChange: (json: object) => void
  placeholder?: string
}

export function TipTapEditor({ value, onChange, placeholder = 'Start writing…' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExt.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || { type: 'doc', content: [{ type: 'paragraph' }] },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })

  if (!editor) return null

  const ToolbarBtn = ({ label, action, active }: { label: string; action: () => void; active: boolean }) => (
    <button type="button" className={`tiptap-btn${active ? ' is-active' : ''}`} onMouseDown={e => { e.preventDefault(); action() }}>
      {label}
    </button>
  )

  return (
    <div className="tiptap-wrap">
      <div className="tiptap-toolbar">
        <ToolbarBtn label="B" action={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} />
        <ToolbarBtn label="I" action={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} />
        <ToolbarBtn label="U" action={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} />
        <ToolbarBtn label="H2" action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} />
        <ToolbarBtn label="H3" action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} />
        <ToolbarBtn label="• List" action={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} />
        <ToolbarBtn label="1. List" action={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} />
      </div>
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  )
}
