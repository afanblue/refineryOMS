#!/bin/sh

# save our current location
pushd .

cd $path

# Delete files older than the $limit.
find . -name $1.txt* -exec rm {} \;

# return to the beginning
popd