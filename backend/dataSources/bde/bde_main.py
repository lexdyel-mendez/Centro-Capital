from functions.exc2JSON import exc2JSON
from functions.xlsReq import xlsReq
import os

#Creating a path to save our output
path="results/"
if not os.path.exists(path):
    os.makedirs(path)

#First we need to call to the website to make sure the data is updated and fresh
currFilename = xlsReq()

#We have the file, now we need to see how many sheets exist and inside there manage the creation
exc2JSON(currFilename)