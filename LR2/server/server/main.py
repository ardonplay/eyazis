from typing import Annotated

import uvicorn
from fastapi import FastAPI, Form
from server.utils import basis

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": False})


@app.get("/api/v1/lr2")
async def root(text: Annotated[str, Form()]):
    return basis.tokenize(text)


def start():
    uvicorn.run("my_package.main:app", host="0.0.0.0", port=8000, reload=True)
