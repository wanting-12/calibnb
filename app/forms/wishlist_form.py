from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class WishlistForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    # may not need
    # start = DateTimeField('start')
    # end = DateTimeField('end')