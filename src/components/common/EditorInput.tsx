import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Stack } from '@mui/material'

interface EditorInputProps {
  onCancel: () => void
  onComment: (content: string) => void
}

export default function EditorInput({ onCancel, onComment }: EditorInputProps) {
  const editorRef = useRef<any>(null)
  const handleComment = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      onComment(content)
    }
  }
  return (
    <>
      <Editor
        apiKey="qvlnh03im66zr8ll10yrkcdin105z0fu4jebkj48b8a6t0bq"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent wordcount' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <Stack direction={'row'} justifyContent={'flex-end'} marginTop={1}>
        <Button onClick={handleComment}>Trả Lời</Button>
        <Button onClick={onCancel}>Hủy bỏ</Button>
      </Stack>
    </>
  )
}
