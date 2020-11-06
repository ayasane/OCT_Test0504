#!/bin/bash

for dir in `ls modules/img/*`; do
    dir2=`echo "$dir" | sed -e 's/://g'`
    touch $dir2/hoge.txt
done


