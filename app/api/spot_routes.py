from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Spot, Review, Booking, Experience, Wishlist, Image
from app.forms import SpotForm, ReviewForm, BookingForm, ExperienceForm, WishlistForm, ImageForm
from app.aws_upload import upload_file_to_s3, allowed_file, get_unique_filename

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('')
def all_spots():
    '''
    Query for all spots and return them in a list of dictionaries
    '''
    params = request.args # [('name', 'Beach')]
    # print("-------------")
    # print("-------------")
    # print("------------- request.args", params)
    # print("-------------")
    # print("-------------")
    # print("-------------")
    if len(params) == 0 or not params.get('type'):
        spots = Spot.query.all()
        # for s in spots:

        # print("-------")
        # print('all spots', spots[0].images[0].to_dict())
        # print('all spots', spots[0].images[0].to_dict()['url'])
        # print("-------")
        # print('one spot', spots[0].to_dict_basic())
        return {"spots": [spot.to_dict_details() for spot in spots]}
    else:
        # test if it works
        # print("-------------")
        # print("-------------")
        # print("------------- request.args", params)
        # print("-------------")
        # print("-------------")
        # print("-------------")

        if params.get("type"):
            spots = Spot.query.filter_by(type=params.get('type'))
        # if params.get('name'):
        #     spots = spots.filter_by(name=params.get('name'))
        # if params.get('min'):
        #     spots = spots.filter(Spot.price >= params.get('min'))
        # if params.get('max'):
        #     spots = spots.filter(Spot.price <= params.get('max'))
        # spots = spots.all()

        return {'spots': [spot.to_dict_details() for spot in spots]}


@spot_routes.route('/owner/<int:ownerId>')
def user_spots(ownerId):
    '''
    Query for all spots of current user and return them in a list of dictionaries
    '''
    spots = Spot.query.filter_by(userId=ownerId).all()

    return {"spots": [spot.to_dict() for spot in spots]}


@spot_routes.route("/<int:id>")
def spot_by_id(id):
    '''
    Query one spot by its id and return it in a disctionary
    '''
    spot = Spot.query.get(id)

    # print("-------")
    # print("spot", spot)
    return spot.to_dict_details()


@spot_routes.route("", methods=["POST"])
@login_required
def create_spot():

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:

        # print('-------')
        # print('-------')
        # print("------", form.data)
        # print('-------')
        # print('-------')
        address = form.data["address"]
        city = form.data["city"]
        state = form.data["state"]
        country = form.data["country"]
        name = form.data["name"]
        price = form.data["price"]
        tags = form.data["tags"]
        guests = form.data["guests"]
        bedroom = form.data["bedroom"]
        beds = form.data["beds"]
        bath = form.data["bath"]
        preview_img = "none"
        clean_fee = form.data['clean_fee']
        service_fee = form.data["service_fee"]
        type = form.data['type']

        # preview_img = request.form['preview_img']
        # print('preview imges in the form.data', preview_img)
        # preview_img = get_unique_filename(preview_img.filename)
        # upload = upload_file_to_s3(preview_img)

        # preview_img = upload['url']

        new_spot = Spot(
            address=address,
            city=city,
            state=state,
            country=country,
            name=name,
            price=price,
            tags=tags,
            guests=guests,
            bedroom=bedroom,
            beds=beds,
            bath=bath,
            preview_img=preview_img,
            clean_fee=clean_fee,
            service_fee=service_fee,
            type=type,
            userId=current_user.id,
        )

        db.session.add(new_spot)
        db.session.commit()

        return new_spot.to_dict_details()

    if form.errors:
        return form.errors

@spot_routes.route('/<int:spotId>/images', methods=["POST"])
@login_required
def add_images(spotId):
    spot = Spot.query.get(spotId)

    if "image" not in request.files:
        print("---------")
        print("--------- error in 146")
        print("---------")
        print("---------")
        return {'errors': 'image required'}, 400

    image = request.files['image']
    # print('----------')
    # print('----------')
    # print("going in bakcend creating image", image)
    # print("going in bakcend creating image", image.filename)
    # print('----------')
    # print('----------')
    # print('----------')

    if not allowed_file(image.filename):
        # print("------in line 141")
        print("---------")
        print("--------- error in 163")
        print("---------")
        print("---------")
        return {'errors': 'file type is not permitted'}, 400

    # print("------in line 144")
    image.filename = get_unique_filename(image.filename)
    print("files name", image.filename)

    upload = upload_file_to_s3(image)
    print("------in line 149", upload)
    if 'url' not in upload:

        print("---------")
        print("--------- error in 176", upload)
        print("---------")
        print("---------")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        # print("------in line 154")
        return upload, 400

    # print("------in line 157", upload)
    url = upload['url']
    preview = request.form['preview'] == 'true'

    # print("url------", url)
    # print('preview------', preview)

    new_img = Image(url=url, preview=preview, spotId=spotId)

    # print("-------------")
    # print("-------------new img", new_img)
    # print("-------------")

    spot.images.append(new_img)
    
    db.session.add(new_img)
    db.session.commit()

    return {"new_img": new_img.to_dict()}

@spot_routes.route('/<int:spotId>/images')
def spot_images(spotId):
    images = Image.query.filter_by(spotId=spotId).all()
    # print('-----')
    # print('-----')
    # print('----- images in backend', images)
    # print('-----')
    # print('-----')

    return {'images': [i.to_dict() for i in images]}
    
@spot_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
 
    spot = Spot.query.get(id)
    if spot.userId == current_user.id:
        if form.validate_on_submit:
            if form.data["address"]: spot.address = form.data["address"] 
            if form.data["city"]: spot.city = form.data["city"] 
            if form.data["state"]: spot.state = form.data["state"] 
            if form.data["country"]: spot.country = form.data["country"] 
            if form.data["name"]: spot.name = form.data["name"] 
            if form.data["price"]: spot.price = form.data["price"]
            if form.data["tags"]: spot.tags = form.data["tags"]
            if form.data['guests']: spot.guests = form.data['guests']
            if form.data['bedroom']: spot.bedroom = form.data['bedroom']
            if form.data['beds']: spot.beds = form.data['beds']
            if form.data['bath']: spot.bath = form.data['bath']
            if form.data['clean_fee']: spot.clean_fee = form.data['clean_fee']
            if form.data['service_fee']: spot.service_fee = form.data['service_fee']
            if form.data['type']: spot.type = form.data['type']

            db.session.commit()

            return spot.to_dict()
        
        if form.errors:
            return form.errors
    else:
        return {'error': 'You do not have the access.'}


@spot_routes.route('<int:id>', methods=["DELETE"])
@login_required
def delete_spot(id):
    spot = Spot.query.get(id)

    if spot.userId == current_user.id:
        db.session.delete(spot)
        db.session.commit()

        return {'message': 'The spot has been deleted!'}

    else:
        return {'error': 'You do not have the access.'}


@spot_routes.route('/<int:spotId>/reviews')
def spot_reviews(spotId):

    '''
    Query for all reviews of a spot and return them in a list of dictionaries
    '''
    reviews = Review.query.filter_by(spotId=spotId).all()

    # print("-----")
    # print("-----")
    # print("reviews---", reviews)
    # print("-----")
    # print("-----")

    return {'Reviews': [review.to_dict() for review in reviews]}
        

@spot_routes.route('/<int:spotId>/reviews', methods=["POST"])
@login_required
def add_review(spotId):

    '''
    Query for creating a review based on the spotId and return it as a dictionary
    '''

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.filter_by(userId=current_user.id, spotId=spotId).first()
    # print('--------')
    # print('--------')
    # print('--------review form data', form.data)
    # print('--------')
    # print('--------')


    if review:
        return {'error': 'You have posted a review already.'}

    if form.validate_on_submit:
        content = form.data["content"]
        cleanliness = form.data["cleanliness"]
        check_in = form.data["check_in"]
        communication =form.data["communicatoin"]
        value = form.data["value"]
        location = form.data["location"]
        accuracy = form.data["accuracy"]

        new_review = Review(
            content=content, 
            cleanliness=cleanliness,
            check_in=check_in,
            communication=communication,
            value=value,
            location=location,
            accuracy=accuracy,
            userId=current_user.id,
            spotId=spotId
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    
    if form.errors:
        return form.errors


@spot_routes.route('/<int:spotId>/bookings')
def spot_bookings(spotId):
    '''
    Query for a specific spot's bookings and return them in a list of dictionaries
    '''

    bookings = Booking.query.filter_by(spotId=spotId).all()

    return {'Bookings': [booking.to_dict() for booking in bookings]}

        

@spot_routes.route('/<int:spotId>/bookings', methods=['POST'])
@login_required
def create_booking(spotId):
    '''
    Query for creating a booking for a spot by the spotId and return 
    it in a dictionary
    '''

    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("------------")
    # print("------------")
    # print("------------", form.data)
    # print("------------")
    # print("------------")

    if form.validate_on_submit:
        start = form.data['start']
        end = form.data['end']

        # print("------------")
        # print("------------", form.data)
        # print("start in backend", start, end)

        new_booking = Booking(start=start, end=end, spotId=spotId, userId=current_user.id)
        # print("------------")
        # print("------------")
        # print("new booking", new_booking)
        # print("------------")
        # print("------------")


        db.session.add(new_booking)
        db.session.commit()

        return new_booking.to_dict()


@spot_routes.route('/<int:spotId>/experiences')
def spot_experiences(spotId):
    '''
    Query for getting a spot's experiences based on its id and 
    return them in a list of dictionaries
    '''
    experiences = Experience.query.filter_by(spotId=spotId)

    return {'Experiences': [e.to_dict() for e in experiences]}


@spot_routes.route('/<int:spotId>/experiences', methods=['POST'])
@login_required
def create_experience(spotId):
    '''
    Query for create an experience a spot based on its id and
    return it as a dictionary
    '''
    form = ExperienceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        duration = form.data['duration']
        tags = form.data['tags']
        content = form.data['content']
        name = form.data['name']

        new_exp = Experience(duration, tags, content, name, userId=current_user.id, spotId=spotId)
        
        db.session.add(new_exp)
        db.session.commit()

        return new_exp.to_dict()
    
    if form.errors:
        return form.errors


@spot_routes.route('/<int:spotId>/wishlists/<int:wishlistId>', methods=['POST'])
@login_required
def add_spot_to_wishlist(spotId, wishlistId):

    wishlist = Wishlist.query.get(wishlistId)

    if wishlist:

        form = WishlistForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit:
            wishlist.spots.append(spotId)

            db.session.commt()

            return wishlist.to_dict()

        if form.errors:
            return form.errors

    else:
        return {'error': 'The wishlist is not found.'} 



@spot_routes.route('/<int:spotId>/images', methods=['POST'])
@login_required
def add_imgage(spotId):

    spot = Spot.query.get(spotId)

    if spot:
        if spot.userId == current_user.id:

            form = ImageForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit:
                # not sure yet
                pass


