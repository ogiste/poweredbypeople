# -*- coding: utf-8 -*-
"""
    app.api.v1
    ~~~~~~~~~~~~~~

    A module for setting the resources and blueprint configuration
    for version 2 of the application

"""
from flask import Blueprint
from flask_restful import Api

from .views.auth import AuthView
# Local imports
from .views.user import UserView

v1 = Blueprint("v1", __name__, url_prefix="/api/v1")

api_v1 = Api(v1)
api_v1.add_resource(UserView, '/users', '/users/<int:id>')
api_v1.add_resource(AuthView, '/auth')
