#!/bin/bash

content_url="https://ftp.semanticpie.software/public/eyazis/LR2/content/"

download_content(){
    local name=$1
    local folder=$2
    wget -nc "${content_url}${name}" -P "${folder}"
}


echo "downloading content..."

mkdir content
download_content carcandans.json ./content
download_content corpus.json ./content
download_content plaintext.txt ./content

echo "download complete"

echo "shelling..."

poetry install

echo "run server..."

poetry run server