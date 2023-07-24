#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import cv2
import logging
import telebot


# Check for environment variable
if 'xecFY_TKN' not in os.environ:
    print("Environment variable 'xecFY_TKN' not defined.", file=sys.stderr)
    exit(1)


# Initialize logger (only logs exceptions and polling status at info+ level)
logger = telebot.logger
logger.setLevel(logging.INFO)

# Initialize bot api with token from environment
bot = telebot.TeleBot(os.environ['xecFY_TKN'], skip_pending=True)

botname = bot.get_me().username

# xec image and final image extension
img_xec = cv2.imread('xec.png', -1)
img_ext = '_xecfied.png'

# Cascade classifier parameters, can be tricky to adjust...
cc_scale_factor = 1.2
cc_min_neighbors = 5
cc_min_size = (20, 20)
cc_flags = cv2.CASCADE_SCALE_IMAGE | cv2.CASCADE_DO_ROUGH_SEARCH

# Contrast Limited Adaptive Histogram Equalization
adaptative = True
clahe_clip = 3.0
clahe_tile = (8, 8)


# xecfy magic happens here (very wow, such magic, many pattern recognition)
def xecfy(img_file):
    # Initialize the classifier with the frontal face haar cascades
    face_cc = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

    # Read image
    img = cv2.imread(img_file)
    # Convert to grays
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Equalize histogram, for improving contrast (this helps detection)
    if adaptative:
        clahe = cv2.createCLAHE(clipLimit=clahe_clip, tileGridSize=clahe_tile)
        gray = clahe.apply(gray)
    else:
        gray = cv2.equalizeHist(gray)

    # Perform detection
    faces = face_cc.detectMultiScale(gray,
                                     scaleFactor=cc_scale_factor,
                                     minNeighbors=cc_min_neighbors,
                                     minSize=cc_min_size,
                                     flags=cc_flags)

    # xecfy all the faces!
    for (x, y, w, h) in faces:
        # Resize the xec according to the face
        xec_res = cv2.resize(img_xec, (w, h))

        # Copy the resided xec over the face keeping the alpha channel
        for c in range(0, 3):
            img[y:y+h, x:x+w, c] = xec_res[:, :, c] * \
                                   (xec_res[:, :, 3] / 255.0) + \
                                   img[y:y+h, x:x+w, c] * \
                                   (1.0 - (xec_res[:, :, 3] / 255.0))

    # Write the file if there is at least one face
    n_faces = len(faces)
    if n_faces > 0:
        cv2.imwrite(img_file+img_ext, img)

    return n_faces


# Bot photo handler
@bot.message_handler(content_types=['photo'])
def handle_photo(m):
    # Chat id, for sending actions and file
    cid = m.chat.id

    # Search the biggest photo (avoid thumbnails)
    f_id = None
    b_size = 0
    for p in m.photo:
        t_size = p.height * p.width
        if t_size > b_size:
            b_size = t_size
            f_id = p.file_id

    # Download and write the file
    f_info = bot.get_file(f_id)
    f_download = bot.download_file(f_info.file_path)

    with open(f_id, 'wb') as f:
        f.write(f_download)

    # xecfy all the faces!!
    n_faces = xecfy(f_id)

    if n_faces > 0:
        # Send "uploading photo" action since can take a few seconds
        bot.send_chat_action(cid, 'upload_photo')

        # Upload the photo and do it as a reply
        bot.send_photo(cid,
                       open(f_id+img_ext, 'rb'),
                       caption='Very wow, such xec%s.' %
                       ('s' if n_faces > 1 else ''))

        try:
            os.unlink(f_id+img_ext)
        except Exception as e:  # You shouldn't do this never but... *effort*
            logger.error(e)

    # If there is no faces and is not a group tell the user
    elif cid > 0:
        bot.send_chat_action(cid, 'typing')
        bot.send_message(cid, 'Very fail, such sad, no faces.')

    try:
        os.unlink(f_id)
    except Exception as e:  # You shouldn't do this never but... *effort*
        logger.error(e)


# Help/Start handler
@bot.message_handler(commands=['start', 'help'])
def handle_start_help(m):
    cmd = m.text.split()[0]
    if '@' in cmd and cmd.split('@')[-1] != botname:
        return

    bot.send_chat_action(m.chat.id, 'typing')
    bot.send_message(m.chat.id,
                     ("Hi, I search for faces in sent photos and if I find "
                      "any I replace them for *xecs*. _Very wow._"
                      "\n\nPlease rate me at the @storebot following this "
                      "link: https://telegram.me/storebot?start=xecfy\_bot\n"
                      "\nQ: Why do I need _access to messages_?\n"
                      "A: In order to get images sent to groups I need it. "
                      "I don't like it either, I would prefer a system where "
                      "bot developers can register _atomic permissions_ like "
                      "_get-image_, _send-image_, _get-audio_, _send-audio_, "
                      "...\n"
                      "\nThe source code is licensed under _GPLv3_ and can be "
                      "found at https://github.com/skgsergio/xecfy-tg-bot"),
                     disable_web_page_preview=True,
                     parse_mode="Markdown")


# Start the polling
bot.polling(none_stop=True)
