
import { useAppSelector } from "@/redux/store"
import InputView from "./InputView"
import OutputView from "./OutputView"
import HelpView from "./HelpView"

const CaseManager = () => {
    
    const isPasrsed = useAppSelector(state => !!state.parsedText)
    const isHelpMode = useAppSelector(state => state.isHelpMode)
    return (
        <div class={`w-full h-dvh flex flex-row  p-5`}>
            <HelpView isHelpMode={isHelpMode} />
            <InputView isPasrsed={isPasrsed} isHelpMode={isHelpMode} />
            <OutputView />
        </div>)
}

export default CaseManager