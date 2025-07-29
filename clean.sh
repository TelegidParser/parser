#!/usr/bin/env bash

rm -rf data

mkdir data
mkdir data/1_raw
mkdir data/2_in
mkdir data/3_txt
mkdir data/4_xml
mkdir data/5_zip


FILES_DIR=/Users/sergeibasharov/works/tv/files

rm -rf $FILES_DIR
mkdir $FILES_DIR
mkdir $FILES_DIR/data
mkdir $FILES_DIR/gc
mkdir $FILES_DIR/rc
mkdir $FILES_DIR/out
