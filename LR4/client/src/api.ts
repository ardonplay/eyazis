import { config } from "./appConfiguration"
import { responseToObject } from "./utils/hellpers"

export type ApiResponse = {
    [key: string]: { 
        morpheme: string 
        type: string
        count: number
    }
}

export const serverApi = {
    fetchForAnalyse: async (text: string): Promise<ApiResponse> => {
        const formData = new FormData()
        formData.append("text", text)
        return fetch(`http://${config.host}/api/v1/lr2`, { method: 'POST', body: formData })
            .then(responseToObject)
    }
} 