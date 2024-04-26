import { useAppSelector } from "@/redux/store"

const posTags = [
    { code: "CC", description: "союз" },
    { code: "CD", description: "кардинальное число" },
    { code: "DT", description: "определитель" },
    { code: "EX", description: "существование там" },
    { code: "FW", description: "иностранное слово" },
    { code: "IN", description: "предлог/подчинительный союз" },
    { code: "JJ", description: "прилагательное" },
    { code: "VP", description: "глагольная группа" },
    { code: "JJR", description: "прилагательное, сравнительная степень" },
    { code: "JJS", description: "прилагательное, превосходная степень" },
    { code: "LS", description: "маркер списка  1)" },
    { code: "MD", description: "модальный глагол сосотавное сказуемое" },
    { code: "NN", description: "существительное, единственное число" },
    { code: "NNS", description: "существительное, множественное число" },
    { code: "PP", description: "предложная группа" },
    { code: "NNP", description: "имя собственное, единственное число" },
    { code: "NNPS", description: "имя собственное, множественное число" },
    { code: "PDT", description: "предопределитель" },
    { code: "POS", description: "притяжательное окончание" },
    { code: "PRP", description: "личное местоимение" },
    { code: "PRP$", description: "притяжательное местоимение" },
    { code: "RB", description: "наречие" },
    { code: "RBR", description: "наречие, сравнительная степень" },
    { code: "RBS", description: "наречие, превосходная степень" },
    { code: "RP", description: "частица" },
    { code: "S", description: "Простое повествовательное предложение" },
    { code: "SBAR", description: "Предложение, введенное (возможно пустым) подчинительным союзом" },
    { code: "SBARQ", description: "Прямой вопрос, введенный вопросительным словом или вопросительной группой" },
    { code: "SINV", description: "Инвертированное повествовательное предложение" },
    { code: "SQ", description: "Инвертированный вопрос да/нет, или главное предложение вопроса, следующее за вопросительной группой в SBARQ" },
    { code: "SYM", description: "Символ" },
    { code: "VBD", description: "глагол, прошедшее время" },
    { code: "VBG", description: "глагол, герундий/презенс-партицип  берущий" },
    { code: "VBN", description: "глагол, прошедшее причастие  взятый" },
    { code: "VBP", description: "глагол, настоящее время, ед. число, не 3-е лицо" },
    { code: "VBZ", description: "глагол, настоящее время, 3-е лицо, ед. число" },
    { code: "WDT", description: "вопросительный определитель" },
    { code: "WP", description: "вопросительное местоимение" },
    { code: "WP$", description: "притяжательное вопросительное местоимение" },
    { code: "WRB", description: "вопросительное наречие" },
    { code: "TO", description: "to" },
    { code: "UH", description: "междометие" },
    { code: "VB", description: "глагол, исходная форма" }
];


const CringeView = () => {
    const splited = useAppSelector(state => state.splitedText)

    return (
        <div class={`flex flex-col ${splited ? 'min-w-[340px] ml-5' : 'w-0 !p-0 border-0 opacity-0'} h-[100%] opacity-100 overflow-hidden transition-all duration-150`}>
            <h2 class='font-mono p-1'>Codes Info</h2>
            <div class={`relative flex flex-col gap-3 min-w-full h-full px-5 py-2 border border-1 border-primary rounded-md overflow-y-auto`}>

                <table
                    class="absolute top-0 bottom-0 left-5 right-5 flex flex-col text-left text-sm font-light text-surface ">
                    <thead
                        class={`font-mono opacity-70 border-primary font-medium `}>
                        <tr>
                            <th scope="col" class="text-left min-w-16 py-2">code</th>
                            <th scope="col" class="text-left w-[120px] py-2">description</th>
                        </tr>
                    </thead>
                    <tbody class='flex flex-col overflow-y-scroll pr-[4px] mr-[-10px]'>

                        {posTags.map(tag => <tr>
                            <td class="whitespace-nowrap text-left min-w-16 font-medium opacity-70">{tag.code}</td>
                            <td class={`whitespace-nowrap text-left w-[120px]`}>{tag.description}</td>
                        </tr>)}

                    </tbody>
                </table>

            </div>
        </div>)
}


export default CringeView