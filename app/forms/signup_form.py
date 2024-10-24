from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if the user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address already exists.')

    
def username_exists(form, field):
    # Checking if the username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username already exists.')
    
# def same_password(form, field):
#     # Checking if the confirmed password is the same as the password
#     password = field.data
#     if password != form.data['password']:
#         raise ValidationError('The confirmed password needs to be the same.')

class SignupForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    # icon = StringField('icon')
    # confirmed = StringField('confirm', validators=[DataRequired(), same_password])