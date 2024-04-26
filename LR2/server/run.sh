#!/bin/bash

./download_content.sh

echo "Installing deps"
poetry install
echo "Starting server"
poetry run server
