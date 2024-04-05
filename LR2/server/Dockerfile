FROM python:3.12.2-alpine3.19

RUN pip install poetry

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY server ./server

RUN poetry install

ENTRYPOINT ["poetry", "run", "server"]