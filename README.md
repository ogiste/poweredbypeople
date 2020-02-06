## Introduction
A web based system for ordering items from vendor shops online.

## Running the API  ##
Clone this repo to your machine

 ``` git clone https://github.com/ogiste/poweredbypeople.git ```

Then change the directory to the project by

``` cd ireporter ```

to make sure all the packages needed to run the project present in your machine,
we'll create a virtual environment and install the packages there

* to create a virtual environment run


    ``` virtualenv -p python3 venv```
* activating the enviroment

    ``` source venv/bin/activate```

The virtual enviroment is now ready, we can install all packages needed for project
ensure you have pip installed otherwise
then on your terminal run

``` pip install -r requirements.txt ```

# run
To test our project on your terminal run

``` export FLASK_APP=run.py```