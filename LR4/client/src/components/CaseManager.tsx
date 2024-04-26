
import { useAppSelector } from "@/redux/store"
import InputView from "./InputView"
import HelpView from "./HelpView"
import GraphView from "./GraphView"

const CaseManager = () => {
    const isHelpMode = useAppSelector(state => state.isHelpMode)
    const parsed = useAppSelector(state => state.parsedNodes)

    return (
        <div class={`w-full h-dvh flex flex-row  p-5`}>
            <HelpView isHelpMode={isHelpMode} />
            <InputView isPasrsed={!!parsed} isHelpMode={isHelpMode} />
            <GraphView data={parsed} />
        </div>)
}

export default CaseManager