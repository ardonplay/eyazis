import { clearResponseData, fetchForAnalyse, useAppDispatch } from "@/redux/store"
import { useSignal } from "@preact/signals"
import { TargetedEvent, useRef } from "preact/compat"

const InputView = (props: { isPasrsed: boolean, isHelpMode: boolean }) => {
    const dispatch = useAppDispatch()
    const dragAndDropMode = useSignal(false)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const fetchForParse = (e: TargetedEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value

        if (text.length > 0)
            dispatch(fetchForAnalyse(text))
        else
            dispatch(clearResponseData())
    }

    const onFileDrag = (e: TargetedEvent<HTMLElement, DragEvent>) => {
        const dt = e.dataTransfer

        if (dt && dt.types && dt.types.indexOf('Files') != -1) {
            if (!dragAndDropMode.value)
                dragAndDropMode.value = true
        }

        e.stopPropagation()
        e.preventDefault()
    }

    const uploadTextFile = (file: File) => {
        const textFile = /text.*/

        if (file && file.type.match(textFile)) {
            const reader = new FileReader()
            reader.onload = () => {
                if (!textareaRef.current) return
                const uploadedText = reader.result as string

                textareaRef.current.value = uploadedText
                dispatch(fetchForAnalyse(uploadedText))
            }
            reader.readAsText(file)
        }
    }

    const onFileDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!e.dataTransfer) return

        const file = e.dataTransfer?.files[0]

        uploadTextFile(file)

        dragAndDropMode.value = false
    }

    const onFileInput = (e: TargetedEvent<HTMLInputElement, Event>) => {
        uploadTextFile((e.target as any).files[0])
    }

    return (
        <div class={`group flex flex-col max-w-full w-full ${props.isHelpMode ? '!max-w-0' : ''} ${props.isPasrsed ? '!max-w-[500px]' : ''} overflow-hidden transition-all duration-200`}>
            <h2 class='font-mono p-1'>Inupt controls</h2>
            <div onDragLeave={() => dragAndDropMode.value = false} onDragOver={onFileDrag} class={`flex flex-col w-full h-full p-5 border border-1 border-primary rounded-md `}>
                {dragAndDropMode.value ?
                    <label onDragOver={onFileDrag} onDrop={onFileDrop} class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg bg-transparent">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-400"><span class="font-semibold">Drag and drop to upload</span></p>
                            <p class="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                    </label> : <>
                        <textarea ref={textareaRef} onChange={fetchForParse} placeholder='Start writing here...' class='w-full h-full bg-transparent focus:outline-none resize-none pr-[30px]'>
                        </textarea>
                        <input id="file-selector" onInput={onFileInput} type="file" class="hidden" />
                        <label for="file-selector" class='opacity-0 w-fit group-hover:opacity-20 text-primary cursor-pointer hover:!opacity-50 transition-opacity ease-in'>Import text from file</label>

                    </>
                }
            </div>
        </div>
    )
}



export default InputView
