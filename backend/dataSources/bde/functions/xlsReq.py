def xlsReq():
    import requests
    url = "https://www.bde.pr.gov/BDE/PREDDOCS/I_LABOR.XLS"
    resp = requests.get(url)

    slicedArr = url.split("/")
    filename = slicedArr[len(slicedArr)-1]


    output = open(filename, 'wb')
    output.write(resp.content)
    output.close()
    return filename