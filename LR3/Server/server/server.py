import os
from typing import Annotated
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from nltk.draw import TreeView
from starlette.responses import FileResponse

import lib_interactions

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


@app.post("/api/v1/lr3/tree")
async def root(text: Annotated[str, Form()]):
    generate_tree(text)
    return FileResponse("output.png")


def process_text(text):
    processed_text = lib_interactions.process_text(
        text)
    indexed = [
        (count, processed_text[count][0], processed_text[count][1])
        for count in range(len(processed_text))
    ]
    return indexed


def generate_tree(text):
    t = process_text(text)[0][2][0]
    TreeView(t)._cframe.print_to_file('output.ps')
    os.system('convert output.ps output.png')
