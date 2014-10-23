#!/bin/bash

echo "Flashing core $1 with new keys for server at IP $2"
spark keys new
spark keys save $1
./key_gen.js
spark keys server default_public.pub.pem $2

