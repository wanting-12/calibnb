from flask_wtf import FlaskForm
from wtforms import DateField
from wtforms.validators import DataRequired, ValidationError
import datetime
from app.models import Booking

def valid_start(form, field):
    if datetime.datetime(field.data) < datetime.datetime.now():
        raise ValidationError('Invalid start date.')

def valid_end(form, field):
    if datetime.datetime(field.data) < datetime.datetime.now() or datetime.datetime(field.data) < datetime.datetime(form.start.data):
        raise ValidationError('Invalid end date.')

def startdate_conflict(form, field):
    start = field.data
    booking = Booking.query.filter_by(start=datetime.datetime(start)).first()

    if booking:
        raise ValidationError('The spot is already book on this date')
    
def enddate_conflict(form, field):
    end = field.data
    booking = Booking.query.filter_by(end=datetime.datetime(end)).first()

    if booking:
        raise ValidationError('The spot is already book on this date')

class BookingForm(FlaskForm):
    start = DateField('start', validators=[DataRequired(), valid_start, startdate_conflict])
    end = DateField('end', validators=[DataRequired(), valid_end, enddate_conflict])
