from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import requests
import re

url = "https://tradingeconomics.com/puerto-rico/gdp"

# result = requests.get(url)


req = Request(url , headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
doc = BeautifulSoup(webpage, "html.parser")
# title = page_soup.find("title")
# tables = page_soup.find("table")

# with open("Puerto Rico GDP - 2022 Data - 2023 Forecast - 1960-2021 Historical - Chart - News.html", "r") as f:
#     doc = BeautifulSoup(f, "html.parser")

tables = doc.find_all("table")
# text = doc.get_text()
# table_data = tables[0].find_all(["td"], text="106.53")
# gdp_value = table_data[1].string
#
# regex_var = doc.find_all(text=re.compile(""))

trs = tables[0].contents
tags = list(trs[0].next_sibling.next_sibling.next_sibling.descendants)