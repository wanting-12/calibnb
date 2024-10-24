from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Booking
from app.forms import SpotForm, ReviewForm, BookingForm

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('/current')
@login_required
def user_bookings():
    '''
    Query for current user's bookings and return them in a list of dictionaries
    '''

    bookings = Booking.query.filter_by(userId=current_user.id).all()

    return {'Bookings': [booking.to_dict() for booking in bookings]}



@booking_routes.route('/<bookingId>', methods=['PUT'])
@login_required
def edit_booking(bookingId):
    '''
    Query for editting an existing booking and return it in a dictionary
    '''
    booking = Booking.query.get(bookingId)

    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        if booking.userId == current_user.id:
            booking['start'] = form.data['start']
            booking['end'] = form.data['end']

            db.session.commit()
            return booking.to_dict()
        
        else:
            return {'error': 'You do not have access'}

    if form.errors:
        return form.errors

@booking_routes.route("/<int:bookingId>")
@login_required
def get_one_booking(bookingId):
    booking = Booking.query.get(bookingId)
    return booking.to_dict_owner()



@booking_routes.route('/<bookingId>', methods=['DELETE'])
@login_required
def cancel_booking(bookingId):
    '''
    Query for canceling a booking based on bookingId
    '''
    booking = Booking.query.get(bookingId)

    db.session.delete(booking)
    db.session.commit()

    return {'message': 'The booking has been canceled.'}
    

