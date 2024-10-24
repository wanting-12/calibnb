from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    preview = db.Column(db.Boolean, nullable=False)
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spots.id")), nullable=False)

    spot = db.relationship('Spot', back_populates='images')

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            'preview': self.preview,
            "created": self.created,
            "updated": self.updated,
            "spotId": self.spotId,
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "url": self.url,
            "preview": self.preview
        }

