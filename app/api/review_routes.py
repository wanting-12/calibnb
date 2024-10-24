from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review
from app.forms import SpotForm, ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/current')
@login_required
def user_reviews():
    '''
    Query for all reviews of current user and return them in a list of dictionaries
    '''
    userId = current_user.id
    reviews = Review.query.filter_by(userId=userId).all()

    return {'Reviews': [review.to_dict_spot() for review in reviews]}


@review_routes.route('/<int:reviewId>')
@login_required
def get_one_review(reviewId):

    review = Review.query.get(reviewId)

    return review.to_dict_user()

@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
 
    review = Review.query.get(reviewId)

    if review.userId == current_user.id:
        if form.validate_on_submit:
            if form.data["content"]: review.content = form.data["content"] 
            if form.data["cleanliness"]: review.cleanliness = form.data["cleanliness"] 
            if form.data["check_in"]: review.check_in = form.data["check_in"] 
            if form.data["communicatoin"]: review.communicatoin = form.data["communicatoin"] 
            if form.data["value"]: review.value = form.data["value"] 
            if form.data["location"]: review.location = form.data["location"]
            if form.data["accuracy"]: review.accuracy = form.data["accuracy"]

            db.session.commit()
            return review.to_dict_user()

        if form.errors:
            return form.errors
    else:
        return {'error': 'You do not have the access.'}

# @review_routes.route('/<int:reviewId>', methods=["POST"])
# @login_required
# def add_review(reviewId):
#     '''
#     Query for editing a review and return it as a dictionary
#     '''
#     review = Review.query.get(reviewId)
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit:
#         if current_user.id == review.userId:
#             review['content'] = form.data['content']
#             review['cleanliness'] = form.data['cleanliness']
#             review['check_in'] = form.data['check_in']
#             review['communicatoin'] = form.data['communicatoin']
#             review['value'] = form.data['value']
#             review['location'] = form.data['location']
#             review['accuracy'] = form.data['accuracy']

#             db.session.commit()

#             return review.to_dict()

#         else:
#             return {'error': 'You do not have access.'}

#     if form.errors:
#         return form.errors


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
def delete_review(reviewId):
    '''
    Query for deleting a review by its id
    '''
    review = Review.query.get(reviewId)

    db.session.delete(review)
    db.session.commit()

    return {'message': 'The review has been deleted.'}

