import { findMatchings, useAppDispatch, useAppSelector } from "@/redux/store"

const OutputView = () => {
    const dispatch = useAppDispatch()
    const parsedText = useAppSelector(state => state.parsedText)
    const searchWord = useAppSelector(state => state.searchWord)

    return (
        <div class={`flex flex-col ${parsedText ? 'w-full ml-5' : 'w-0 !p-0 border-0 opacity-0'} h-[100%] opacity-100 overflow-hidden transition-all duration-150`}>
            <h2 class='font-mono p-1'>Parsed text</h2>
            <div class={`relative flex min-w-full h-full px-5 py-2 border border-1 border-primary rounded-md`}>
                <table
                    class="absolute top-0 bottom-0 left-5 right-5 flex flex-col text-left text-sm font-light text-surface ">
                    <thead
                        class={`font-mono ${parsedText ? 'border-b' : ''} opacity-70 border-primary font-medium `}>
                        <tr>
                            <th scope="col" class="text-left w-10 py-2">#</th>
                            <th scope="col" class="text-left w-[120px] py-2">form</th>
                            <th scope="col" class="text-left w-20 py-2">count</th>
                            <th scope="col" class="text-left w-[120px] py-2">type</th>
                        </tr>
                    </thead>
                    {parsedText &&
                        <tbody class='flex flex-col overflow-y-scroll pr-[4px] mr-[-10px]'>
                            {Object.keys(parsedText).map(key => parsedText[key]).map((word, i) => <tr onClick={() => dispatch(findMatchings({ word: word.morpheme }))} class={`py-2 border-b border-primary ${word.morpheme === searchWord ? 'bg-yellow-400 text-black' : ''}`}>
                                <td class="whitespace-nowrap text-left w-10 font-medium opacity-70">{i + 1}</td>
                                <td class={`whitespace-nowrap text-left w-[120px]`}>{word.morpheme}</td>
                                <td class="whitespace-nowrap text-left w-20">{word.count}</td>
                                <td class="whitespace-nowrap text-left w-[120px]">{word.type}</td>
                            </tr>)}
                        </tbody>
                    }
                </table>

            </div>
        </div>)
}

export default OutputView 