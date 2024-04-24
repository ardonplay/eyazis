import os
from typing import Annotated, Optional
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from nltk import Tree
from nltk.draw.util import CanvasFrame
from nltk.draw import TreeWidget
from starlette.responses import FileResponse

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


@app.get("/api/v1/lr3/tree")
async def root(text, node_font: Optional[str] = "arial 14 bold", leaf_font: Optional[str] = "arial 14",
               node_color: Optional[str] = "#005990", leaf_color: Optional[str] = "#3F8F57",
               line_color: Optional[str] = "#175252", x: Optional[int] = 10, y: Optional[int] = 10):
    generate_tree(text, node_font, leaf_font, node_color, leaf_color, line_color, x, y)
    return FileResponse("output.png")


def process_text(text):
    processed_text = basis.process_text(
        text)
    indexed = [
        (count, processed_text[count][0], processed_text[count][1])
        for count in range(len(processed_text))
    ]
    return indexed


def generate_tree(text, node_font="arial 14 bold", leaf_font="arial 14", node_color="#005990", leaf_color="#3F8F57",
                  line_color="#175252", x=10, y=10):
    t = process_text(text)[0][2][0]
    cf = CanvasFrame()
    tc = TreeWidget(cf.canvas(), t)

    tc['node_font'] = node_font

    tc['leaf_font'] = leaf_font
    tc['node_color'] = node_color
    tc['leaf_color'] = leaf_color
    tc['line_color'] = line_color

    cf.add_widget(tc, x, y)
    cf.print_to_file('output.ps')
    os.system('convert output.ps output.png')
