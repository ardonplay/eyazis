from fastapi import FastAPI, Form, Response
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


@app.get("/api/v1/lr4")
async def root(response: Response, text):
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    return basis.process_text_conceptnet(text)