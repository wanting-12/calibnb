from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spot

def name_exits(form, field):
    # checking if the spot name exists
    name = field.data
    spot = Spot.query.filter(Spot.name == name).first()
    if spot:
        raise ValidationError('Spot name already exists.')

    
class SpotForm(FlaskForm):
    address = StringField('address', validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), name_exits])
    price = FloatField('price', validators=[DataRequired()])
    preview_img = StringField('preview_img')
    tags = StringField('tags')
    guests = IntegerField('guests', validators=[DataRequired()])
    bedroom = IntegerField('bedroom', validators=[DataRequired()])
    beds = IntegerField('beds', validators=[DataRequired()])
    bath = IntegerField('bath', validators=[DataRequired()])
    service_fee = DecimalField('service_fee', validators=[DataRequired()])
    clean_fee = DecimalField('clean_fee', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    