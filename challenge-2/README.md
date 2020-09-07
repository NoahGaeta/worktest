**Windows Instructions**

I recommend using a virtual environment to keep your environment safe from version changes.
If you decide to do so run `python -m virtualenv venv` then after run `.\venv\scripts\activate.bat`
If you do not have virtualenv run `python -m pip install virtualenv`
Regardless of your choice run `python -m pip install -r requirements.txt`
Finally to run the script run `python smoother.py`

**Pre-challenge**

Language: Python

Since I am deciding to use the region.kml file to get the coordinates I first need to parse the region.kml file. I then plan on retrieving the coordinates, converting it from a string to a list of floating points. After this, I will seperate the lists by individual coordinates and get the standard deviations of each list. I am not sure what way I will determine the outliers, I am thinking since this is a continous data set that I can just eliminate any values that are over two standard deviations away from the mean. 