from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Image
from app.forms import SpotForm, ReviewForm, ImageForm
from app.aws_upload import upload_file_to_s3, allowed_file, get_unique_filename


image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:imgId>', methods=['DELETE'])
@login_required
def delete_img(imgId):

    img = Image.query.get(imgId)

    if img:
        db.session.delete(img)
        db.session.commit()

        return {'message': 'The image has been deleted.'}
    
    else:
        return {'error': 'The image is not found'}

@image_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_img(id):
    img = Image.query.get(id)

    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'file type is not permitted'}, 400


    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    preview = request.form['preview'] == 'true'

    img.url = url
    img.preview = preview

    db.session.commit()
    
    # print("-----------")
    # print("-----------")
    # print("img in backedn", img, img.to_dict())
    # print("-----------")
    # print("-----------")
    return img.to_dict()

    