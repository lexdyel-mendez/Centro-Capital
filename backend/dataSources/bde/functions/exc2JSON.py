import json
import pandas
import re
import os

from flask import jsonify

def exc2JSON(filename):
    sheetIter(filename)

def sheetIter(filename):
    sheet_df = pandas.read_excel(filename, sheet_name=None)
    #first sheet is usually informative. Can be helpful but we want the data right now which is why we pop
    sheet_df.pop(next(iter(sheet_df)))
    for sheet_name in sheet_df.keys():
        fileConversion(filename, sheet_name)


def fileConversion(filename_param, sheet_name_param):
    # Initializing base necessary values we know we will work with
    years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]
    monthRef = ["JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER", "JANUARY", "FEBRUARY", "MARCH",
                "APRIL",
                "MAY", "JUNE"]
    # MonthArr contains 9 lists of months according to the 9 years in "years" ranging from 2014 to 2022
    monthArr = [
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
        {'JULY': '', 'AUGUST': '', 'SEPTEMBER': '', 'OCTOBER': '', 'NOVEMBER': '', 'DECEMBER': '', "JANUARY": '',
         'FEBRUARY': '', 'MARCH': '', 'APRIL': '', 'MAY': '', 'JUNE': ''},
    ]

    ##################################################################################

    # Turning the EXCEL file into JSON so that we may access the necessary values
    # Extracting the current sheet
    df = pandas.read_excel(filename_param, sheet_name=sheet_name_param)
    jsonoutput = df.to_json()

    #creating json referent to the sheetname
    rawSheet = sheet_name_param + ".json"
    # Converting Excel to json
    jsonFile = open(rawSheet, "w")
    jsonFile.write(jsonoutput)
    jsonFile.close()
    # Opening the newly created json in 'read' mode to access and manipulate data
    openedJSON = json.load(open(rawSheet, "r"))

    #######################################################################################
    # Beginning of actual information population

    # unnamedCounter is used to loop through the unnammedArr
    unnamedCounter = 0
    unnamedArr = ['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4', 'Unnamed: 5', 'Unnamed: 6', 'Unnamed: 7', 'Unnamed: 8',
                  'Unnamed: 9', 'Unnamed: 10']

    # we loop through each year in the outer layer
    for listOfMonths in monthArr:
        # valueIndex refers to the position in openedJSON referent to each year-to-column that provides a value
        # that is to say, valueIndex = 4 provides a value of, for example 13.4, while valueIndex = 5 provides a value of, for example 15.6, for the given month within a given year
        valueIndex = 4

        # and then we loop through each month in the inner layer
        for month in monthRef:
            listOfMonths[month] = openedJSON[unnamedArr[unnamedCounter]][str(valueIndex)]
            valueIndex = valueIndex + 1
        unnamedCounter = unnamedCounter + 1

    # adding newly populated values into the pre-existing "years" to acknowledge as required
    # the zip() function allows to create a 1:1 pairing in values where each "year" is paired to a dictionary of months with values, allowing us to nest as needed
    D = dict(zip(years, monthArr))

    # adding required extra info into the dictionary to prepare for final extraction
    # position '1' is used because in the BDE excel structure that is converted to json, this position holds the type of data we are visualizing
    D.update({"metric style": openedJSON['PUERTO RICO ECONOMIC INDICATORS']['0']})
    D.update({"metric": openedJSON['PUERTO RICO ECONOMIC INDICATORS']['1']})
    D.update({"source": openedJSON['PUERTO RICO ECONOMIC INDICATORS']['73']})

    # #creating json referent to the sheetname
    # finalSheetName = openedJSON['PUERTO RICO ECONOMIC INDICATORS']['1']
    # #To ensure the filename doesn't cause issues we are adding a regex cleaner removing non-alphanumeric characterrs
    # finalSheetName = "results/" + re.sub("[^0-9a-zA-Z\s]+","",finalSheetName) + ".json"
    # # converting existing dictionary into json a a final step of the script for future manipulation
    # with open(finalSheetName, "w") as write_file:
    #     json.dump(D, write_file)

    #deleting the raw data json as it is no longer needed
    os.remove(str(rawSheet))

    return D




