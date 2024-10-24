from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func
from flask_login import UserMixin

# user_saves = db.Table(
#     'user_saves'
#     db.Model.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix('users.id'), ondelete='cascade'), primary_key=True),
#     db.Column('spot_id', db.Integer, db.ForeignKey(add_prefix('spots.id'), ondelete='cascade'), primary_key=True)
# )

# user_saves = db.Table(
#     'user_saves',
#     db.Model.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey(
#         add_prefix('users.id'), ondelete='cascade'), primary_key=True),
#     db.Column('spot_id', db.Integer, db.ForeignKey(
#         add_prefix('spots.id'), ondelete='cascade'), primary_key=True)
# )

# if environment == "production":
#     user_saves.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    icon = db.Column(db.String(255))
    created = db.Column(db.DateTime(
        timezone=True), nullable=False, server_default=func.now())
    # saves = db.Column(db.String(255))
    
    hash_password = db.Column(db.String(255), nullable=False)

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete')
    bookings = db.relationship('Booking', back_populates='user', cascade='all, delete')
    experiences = db.relationship('Experience', back_populates='user', cascade='all, delete')
    # saves = db.relationship(
    #     'Spot', 
    #     secondary=user_saves,
    #     back_populates="user_saves",
    #     cascade='all, delete')
    
    @property
    def password(self):
        return self.hash_password

    @password.setter
    def password(self, password):
        self.hash_password = generate_password_hash(password)

    def check_password(self, password):
        # self.password is the property getter
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "icon": self.icon,
            # "saves": self.saves
            "created": self.created
        }