
const HelpView = (props: { isHelpMode: boolean }) => {
    return (
        <div class={`flex flex-col min-w-0 w-0 ${props.isHelpMode ? '!min-w-full' : ''} overflow-hidden transition-all duration-200`}>
            <h2 class='font-mono p-1'>Help</h2>
            <div class={`flex font-mono flex-col w-full h-full p-5 border border-1 border-primary rounded-md `}>

                <h3>It is a text analysis tool. Here you can:</h3>

                <br />

                <p>1. <span class='font-bold text-primary'>Enter Text</span>: Enter your text in the text field. You can also upload a TXT or RTF file by drag and drop (the maximum file size is 5 MB).</p>
                <p>2. <span class='font-bold text-primary'>Analyze text</span>: The application will fetch for selected (highlighted) word concepts .</p>
                <p>3. <span class='font-bold text-primary'>Search</span>: You can search through the results by using shorcut <span class='font-bold text-primary px-2 py-1 bg-primary bg-opacity-15 rounded-lg'>Ctrl + F</span> or <span class='font-bold text-primary px-2 py-1 bg-primary bg-opacity-15 rounded-lg'>Cmd + F</span> (MacOs)</p>
                <p>4. <span class='font-bold text-primary'>Import Text from File</span>: Load text from a file by clicking this button.</p>
                <p>5. <span class='font-bold text-primary'>Save</span>: Save the current analysis result to a file by clicking this button.</p>
                <p>6. <span class='font-bold text-primary'>Load</span>: Load previously analyzed results from a file by clicking this button.</p>
                <p>7. <span class='font-bold text-primary'>Get help</span>: If you need help, hover over the question icon in the upper-right corner of the page.</p>
                
            </div>
        </div>
    )
}

export default HelpView
