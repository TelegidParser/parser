#!/usr/bin/env bash

rm -rf data
rm -rf result.xml

mkdir data
mkdir data/json
mkdir data/in
mkdir data/txt
mkdir data/xml


FILES_DIR=/Users/sergeibasharov/works/tv/files

rm -rf $FILES_DIR
mkdir $FILES_DIR
mkdir $FILES_DIR/data
mkdir $FILES_DIR/gc
mkdir $FILES_DIR/rc
mkdir $FILES_DIR/out