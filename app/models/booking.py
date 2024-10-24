from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func
from .spot import Spot

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.DateTime(timezone=True), nullable=False)
    end = db.Column(db.DateTime(timezone=True), nullable=False)
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Foreign keys
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("users.id")), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spots.id")), nullable=False)

    spot = db.relationship('Spot', back_populates='bookings')
    user = db.relationship('User', back_populates='bookings')

    def to_dict(self):
        return {
            "id": self.id,
            "start": self.start,
            "end": self.end,
            "created": self.created,
            "updated": self.updated,
            "userId": self.userId,
            "spotInfo": Spot.query.get(self.spotId).to_dict_booking()
        }

    def to_dict_nonowner(self):
        return {
            "id": self.id,
            "start": self.start,
            "end": self.end,
            'spotId': self.spotId,
        }

    def to_dict_owner(self):
        return {
            "id": self.id,
            "start": self.start,
            "end": self.end,
            "created": self.created,
            "updated": self.updated,
            'spotId': self.spotId,
            'spot': self.spot.to_dict_booking(),
            'user': self.user.to_dict()
        }
    