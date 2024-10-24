from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    cleanliness = IntegerField('cleanliness', validators=[DataRequired()])
    check_in = IntegerField('check_in', validators=[DataRequired()])
    communicatoin = IntegerField('communicatoin', validators=[DataRequired()])
    value = IntegerField('value', validators=[DataRequired()])
    location = IntegerField('location', validators=[DataRequired()])
    accuracy = IntegerField('accuracy', validators=[DataRequired()])
    