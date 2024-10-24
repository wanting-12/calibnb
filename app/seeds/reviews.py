from app.models import db, Review, environment, SCHEMA
import random

reviews = [
    Review(
        content="Our stay at this Tiny home was during some severe weather that lead to some unexpected adjustments. John was over the top pro active and helpful to make sure even in the rain, our stay was the ultimate experience. The main house is precious and the other house has an embedded bed in the floor overlooking the landscape that is just adorable. We were only there one night but it was a memorable one!",
        cleanliness=4,
        check_in=3,
        communication=5,
        value=5,
        location=4,
        accuracy=5,
        userId=4,
        spotId=1
    ),
    Review(
        content="Pros: amazing aesthetic space. Looks even better in real life than the pics. Central A/C worked well, appliances were updated, amazing views, super comfy beds, hot water came out quickly, comfy chairs in the living room. Spacey bedrooms.",
        cleanliness=5,
        check_in=4,
        communication=5,
        value=3,
        location=3,
        accuracy=4,
        userId=4,
        spotId=2
    ),
    Review(
        content="I am speechless with the views, the customer service from Cruz and team. I will be back very often!!",
        cleanliness=5,
        check_in=2,
        communication=5,
        value=3,
        location=4,
        accuracy=3,
        userId=5,
        spotId=3
    ),
    Review(
        content="Charming quiet cabin, beautifully designed , luminous and cozy but with ample space. Just a quick couple min drive to the grocery store (and Starbucks) - well appointed kitchen where we cooked a few meals during our stay. My husband and I had a great few days mini-vacation and loved our stay - would highly recommend!",
        cleanliness=3,
        check_in=4,
        communication=2,
        value=1,
        location=3,
        accuracy=2,
        userId=5,
        spotId=2
    ),
    Review(
        content="Thank you we enjoyed our time here. Definitely recommend",
        cleanliness=4,
        check_in=4,
        communication=5,
        value=4,
        location=4,
        accuracy=3,
        userId=6,
        spotId=1
    ),
    Review(
        content="Beautiful A Frame filled with sun and very tastefully designed. Played board games next to the fire place all weekend. It was heaven.",
        cleanliness=3,
        check_in=4,
        communication=4,
        value=3,
        location=4,
        accuracy=3,
        userId=6,
        spotId=2
    ),
    Review(
        content="This Bungalow was absolutely amazing. Waking up to the ocean right outside the back door was incredible. Watching the sunrise from the balcony is something I will never forget. I didn’t want to leave. The most beautiful location and views. I highly recommend. I will most definitely be back!",
        cleanliness=5,
        check_in=5,
        communication=5,
        value=3,
        location=4,
        accuracy=4,
        userId=7,
        spotId=3
    ),

    Review(
        content="Great stay! Would highly recommend especially if you’re getting together with family or friends for a relaxing gathering. My family and I are keeping this at the top of our list for future getaways. All the essentials are available and instructions are clear.",
        cleanliness=5,
        check_in=5,
        communication=5,
        value=3,
        location=4,
        accuracy=4,
        userId=1,
        spotId=2
    ),
    Review(
        content="It is a beautiful place and great location but they need a new cleaning service and do some repairs.",
        cleanliness=5,
        check_in=5,
        communication=5,
        value=3,
        location=4,
        accuracy=4,
        userId=1,
        spotId=13
    )
]

def seed_reviews():
    for r in reviews:
        db.session.add(r)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")
        
    db.session.commit()