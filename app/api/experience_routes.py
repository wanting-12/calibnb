from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Experience
from app.forms import SpotForm, ReviewForm, ExperienceForm

experience_routes = Blueprint('experiences', __name__)


@experience_routes.route('/current')
@login_required
def user_experiences():
    '''
    Query for getting current user's all experiences and return them
    in a list of disctionaries.
    '''
    experiences = Experience.query.filter_by(userId=current_user.id)

    return {'Experiences': [e.to_dict() for e in experiences]}



@experience_routes.route('/<int:expId>', methods=['PUT'])
@login_required
def edit_exp(expId):
    '''
    Query for editing an existing experience based on its id
    and return it as a dictonary
    '''

    exp = Experience.query.get(expId)
    
    form = ExperienceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        exp['duration'] = form.data['duration']
        exp['tags'] = form.data['tags']
        exp['content'] = form.data['content']
        exp['name'] = form.data['name']

        db.session.commit()

        return exp.to_dict()


@experience_routes.route('/<int:expId>', methods=['DELETE'])
@login_required
def delete_exp(expId):
    '''
    Query for deleting an existing experience based on its id
    and return a message indictng deleted successfully
    '''

    exp = Experience.query.get(expId)

    db.session.delete(exp)
    db.session.commit()

    return {'message': 'The experience has been deleted.'}