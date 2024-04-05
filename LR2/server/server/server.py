from typing import Annotated
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

from server.utils import basis

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": True})

origins = [
 "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/v1/lr2")
async def root(text: Annotated[str, Form()]):
    return basis.tokenize(text)

