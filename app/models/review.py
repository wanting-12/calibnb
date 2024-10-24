from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)

    # rating columns
    cleanliness = db.Column(db.Integer)
    check_in = db.Column(db.Integer)
    communication = db.Column(db.Integer)
    value = db.Column(db.Integer)
    location = db.Column(db.Integer)
    accuracy = db.Column(db.Integer)

    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Foreign keys
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("users.id")), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spots.id")), nullable=False)

    spot = db.relationship('Spot', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "cleanliness": self.cleanliness,
            "check_in": self.check_in,
            "communication": self.communication,
            "value": self.value,
            "location": self.location,
            "accuracy": self.accuracy,
            "created": self.created,
            "updated": self.updated,
            "spotId": self.spotId,
            'user': self.user.to_dict(),
        } 

    def to_dict_user(self):
        return {
            "id": self.id,
            "content": self.content,
            "cleanliness": self.cleanliness,
            "check_in": self.check_in,
            "communication": self.communication,
            "value": self.value,
            "location": self.location,
            "accuracy": self.accuracy,
            "created": self.created,
            "updated": self.updated,
            'user': self.user.to_dict(),
        } 

    def to_dict_spot(self):
        return {
            "id": self.id,
            "content": self.content,
            "cleanliness": self.cleanliness,
            "check_in": self.check_in,
            "communication": self.communication,
            "value": self.value,
            "location": self.location,
            "accuracy": self.accuracy,
            "created": self.created,
            "updated": self.updated,
            'user': self.user.to_dict(),
            'spot': self.spot.to_dict_basic()
        } 

    def to_dict_rates(self):
        return {
            "id": self.id,
            "cleanliness": self.cleanliness,
            "check_in": self.check_in,
            "communication": self.communication,
            "value": self.value,
            "location": self.location,
            "accuracy": self.accuracy,
        }