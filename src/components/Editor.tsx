import {useRef, useMemo, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export type EditorPropType = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
};

export default function Editor({ content, setContent }: EditorPropType) {
    const editor = useRef(null);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image'],
            ],
        }),
        []
    );

    return (
        <div className='min-h-72'>
            <ReactQuill
                theme='snow'
                className='editor'
                value={content}
                modules={modules}
                onChange={(newContent) => setContent(newContent)}
            />
        </div>
    );
}
