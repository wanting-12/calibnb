from app.models import db, Wishlist, environment, SCHEMA

wishilists = [
    Wishlist(
        title="wishlist one",
        userId=1,
        spotId=11
    ),
    Wishlist(
        title="wishlist one",
        userId=1,
        spotId=12
    ),
    Wishlist(
        title="wishlist one",
        userId=1,
        spotId=13
    ),
    Wishlist(
        title="wishlist two",
        userId=1,
        spotId=14
    ),
    Wishlist(
        title="wishlist two",
        userId=1,
        spotId=15
    ),
]

def seed_wishlists():
    for w in wishilists:
        db.session.add(w)
    db.session.commit()

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wishlists")
        
    db.session.commit()