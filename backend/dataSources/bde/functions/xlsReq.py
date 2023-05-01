def xlsReq(source='I_LABOR'):
    import requests
    url = f"https://www.bde.pr.gov/BDE/PREDDOCS/{source}.XLS"
    resp = requests.get(url)

    slicedArr = url.split("/")
    filename = slicedArr[len(slicedArr)-1]


    output = open(filename, 'wb')
    output.write(resp.content)
    output.close()
    return filename
