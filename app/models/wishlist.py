from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func
from .spot import Spot

class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)

    # may not need
    start = db.Column(db.DateTime(timezone=True))
    end = db.Column(db.DateTime(timezone=True))

    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Foreign keys
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("users.id")), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spots.id")), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "start": self.start,
            "end": self.end,
            "created": self.created,
            "updated": self.updated,
            "userId": self.userId,
            "spotId": self.spotId,
            "spot": Spot.query.get(self.spotId).to_dict()
        }

    