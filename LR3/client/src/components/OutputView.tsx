import { useAppSelector } from "@/redux/store"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"

const OutputView = () => {
    const splited = useAppSelector(state => state.splitedText)

    return (
        <div class={`flex flex-col ${splited ? 'w-full ml-5' : 'w-0 !p-0 border-0 opacity-0'} h-[100%] opacity-100 overflow-hidden transition-all duration-150`}>
            <h2 class='font-mono p-1'>Tree View by Sentence</h2>
            <div class={`relative flex flex-col gap-3 min-w-full h-full px-5 py-2 border border-1 border-primary rounded-md overflow-y-auto`}>

                {splited && splited.map(s => <SCard sentence={s} />)}
            </div>
        </div>)
}

const SCard: FunctionalComponent<{ sentence: string }> = ({ sentence }) => {
    const show = useSignal(false)


    return (
        <div onClick={() => show.value = !show.value} class={`w-full flex flex-col border border-1 border-primary p-2 rounded-md bg-primary bg-opacity-0 ${show.value ? '!bg-opacity-15' : ''} cursor-pointer transition-all duration-150`}>
            <div>
                {sentence}
            </div>
            <div class={`relative flex w-full h-0 mt-0 ${show.value ? 'h-52 mt-2' : ''} transition-all duration-150`}>
                {show.value && <img class='object-scale-down'  src={`http://localhost:8000/api/v1/lr3/tree?text=${sentence}&line_color=%23FCFFE0&leaf_color=%23FFEC9E&node_color=%239AC8CD`} />}
            </div>
        </div>
    )
}

export default OutputView