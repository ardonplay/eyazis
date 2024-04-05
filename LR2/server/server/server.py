from typing import Annotated
from fastapi import FastAPI, Form
from server.utils import basis

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": True})


@app.get("/api/v1/lr2")
async def root(text: Annotated[str, Form()]):
    return basis.tokenize(text)

