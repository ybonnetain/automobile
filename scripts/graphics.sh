#!/bin/sh


f_sim_capture()
{
    xcrun simctl io booted screenshot $1
}

f_crop_status_bar()
{
    ffmpeg -i $1 -vf "crop=in_w:in_h-40:0:out_h" "cropped_$1.png"
}
