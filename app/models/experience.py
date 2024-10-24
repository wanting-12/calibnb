from .db import db, environment, SCHEMA, add_prefix
from sqlalchemy.sql import func

class Experience(db.Model):
    __tablename__ = "experiences"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    duration = db.Column(db.String(255), nullable=False)
    tags = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    updated = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    # Foreign key
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix("users.id")), nullable=False)
    spotId = db.Column(db.Integer, db.ForeignKey(add_prefix("spots.id")), nullable=False)

    user = db.relationship('User', back_populates="experiences")
    

    def to_dict(self):
        return {
            "id": self.id,
            "duration": self.duration,
            "tags": self.tags,
            "description": self.description,
            "created": self.created,
            "updated": self.updated,
            "userId": self.userId,
            'spotId': self.spotId,
            'user': self.user.to_dict()
        }

