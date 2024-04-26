#!/bin/bash

echo "Installing deps"
poetry install
echo "Starting server"
poetry run server
