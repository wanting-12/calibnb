from app.models import db, Booking, environment, SCHEMA
import random
import datetime

x = datetime.datetime(2020, 5, 17)

bookings = [
    Booking(
        start=datetime.datetime(2022, 12, 1),
        end=datetime.datetime(2022, 12, 3),
        userId=4,
        spotId=1
        ),
    Booking(
        start=datetime.datetime(2022, 12, 17),
        end=datetime.datetime(2022, 12, 18),
        userId=4,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 11, 1),
        end=datetime.datetime(2022, 11, 3),
        userId=5,
        spotId=3
        ),
    Booking(
        start=datetime.datetime(2022, 11, 11),
        end=datetime.datetime(2022, 11, 13),
        userId=5,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 12, 4),
        end=datetime.datetime(2022, 12, 5),
        userId=6,
        spotId=1
        ),
    Booking(
        start=datetime.datetime(2022, 10, 1),
        end=datetime.datetime(2022, 10, 3),
        userId=6,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 12, 1),
        end=datetime.datetime(2022, 12, 3),
        userId=7,
        spotId=3
        ),

    Booking(
        start=datetime.datetime(2023, 1, 10),
        end=datetime.datetime(2023, 1, 13),
        userId=5,
        spotId=1
        ),
    Booking(
        start=datetime.datetime(2023, 1, 2),
        end=datetime.datetime(2023, 1, 12),
        userId=6,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2023, 1, 7),
        end=datetime.datetime(2023, 1, 12),
        userId=7,
        spotId=3
        ),
    Booking(
        start=datetime.datetime(2022, 12, 20),
        end=datetime.datetime(2022, 12, 24),
        userId=4,
        spotId=10
        ),
    Booking(
        start=datetime.datetime(2022, 12, 27),
        end=datetime.datetime(2022, 12, 29),
        userId=4,
        spotId=7
        ),
    Booking(
        start=datetime.datetime(2023, 1, 1),
        end=datetime.datetime(2023, 1, 4),
        userId=4,
        spotId=7
        ),

    Booking(
        start=datetime.datetime(2022, 12, 20),
        end=datetime.datetime(2022, 12, 24),
        userId=1,
        spotId=2
        ),
    Booking(
        start=datetime.datetime(2022, 12, 27),
        end=datetime.datetime(2022, 12, 29),
        userId=1,
        spotId=13
        ),
    Booking(
        start=datetime.datetime(2023, 1, 1),
        end=datetime.datetime(2023, 1, 4),
        userId=1,
        spotId=14
        ),
    

]


def seed_bookings():
    for b in bookings:
        db.session.add(b)

    db.session.commit()

def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookings")
        
    db.session.commit()