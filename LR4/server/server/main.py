import os
import uvicorn


def start():
    port = int(os.getenv("LR4_SERVER_PORT", 8000))
    host = os.getenv("LR4_SERVER_HOST", "0.0.0.0")

    uvicorn.run("server.server:app", host=host, port=port, reload=True)
