export const config = {
    host: import.meta.env.VITE_API_HOST ?? '127.0.0.1:8000'
}

console.log("API:\n", config)