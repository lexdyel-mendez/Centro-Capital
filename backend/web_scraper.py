from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import requests
import re

link = "https://tradingeconomics.com/puerto-rico/gdp"
html_file = "Puerto Rico GDP - 2022 Data - 2023 Forecast - 1960-2021 Historical - Chart - News.html"


def request_html_tree(url):
    # result = requests.get(url)

    # in case of 403 Forbidden error. Must read how to handle robots.txt
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()
    return BeautifulSoup(webpage, "html.parser")


def get_html_tree_from_file(file):
    with open(file, "r") as f:
        html_tree = BeautifulSoup(f, "html.parser")
    return html_tree

# example of finding the title tag
# title = html_tree.find("title")

# example of finding the FIRST table in html
# tables = html_tree.find("table")

# example of finding all tables in html
# tables = html_tree.find_all("table")

# example of getting all the text from html
# text = html_tree.get_text()

# example of finding value from a table after executing find_all(table)
# table_data = tables[0].find_all(["td"], text="106.53")
# gdp_value = table_data[1].string

# Attempting to find data with REGEX
# regex_var = doc.find_all(text=re.compile(""))

# example of traversing tree
# trs = tables[0].contents
# tags = list(trs[0].next_sibling.next_sibling.next_sibling.descendants)
