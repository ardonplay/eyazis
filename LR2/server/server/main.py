import os
import uvicorn


def start():
    port = int(os.getenv("LR2_SERVER_PORT", 8000))
    host = os.getenv("LR2_SERVER_HOST", "0.0.0.0")

    uvicorn.run("server.sersver:app", host=host, port=port, reload=True)
