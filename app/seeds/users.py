from app.models import db, User, environment, SCHEMA


# http://drive.google.com/uc?export=view&id=1BIlbjRI8loGaQD3uPczIZeKqk5AY0-Z4
# https://drive.google.com/file/d/1Q55SgtvbgHx0w6qWMKx7T2vnnTEjA-Nk/view?usp=sharing
# https://drive.google.com/file/d/1RGp_utZ-F6YDfVvrB11mdItgczFU8ins/view?usp=sharing

# https://drive.google.com/file/d/1PNq-XfBOWdgG4nhptbRIe2j5vXAV060K/view?usp=sharing
# https://drive.google.com/file/d/1SGWJsauO0QXwLRm-g9feQbLsK79hDbwP/view?usp=sharing

# https://drive.google.com/file/d/18KRTd3b3JLEZvO8iWa9VdaDkaDNkfCWJ/view?usp=sharing

# https://drive.google.com/file/d/1sgQZrWnoVK3xEiIGZNazEWOnrWxcZgjT/view?usp=sharing
# https://drive.google.com/file/d/1celf73KA4Fb3XQLA7t9An6qGR-Pm_XUO/view?usp=sharing

users = [
    User(
        firstName="Winnie", 
        lastName="Lu", 
        username="Winnie", 
        email="winnie@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1Q55SgtvbgHx0w6qWMKx7T2vnnTEjA-Nk"),
    User(
        firstName="Lily", 
        lastName="Chen", 
        username="Lily", 
        email="lily@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1RGp_utZ-F6YDfVvrB11mdItgczFU8ins"),
    User(
        firstName="Tyler", 
        lastName="Smith", 
        username="Tyler", 
        email="tyler@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1PNq-XfBOWdgG4nhptbRIe2j5vXAV060K"),
    User(
        firstName="Maria", 
        lastName="Garcia", 
        username="Maria", 
        email="maria@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1SGWJsauO0QXwLRm-g9feQbLsK79hDbwP"),
    User(
        firstName="Mary", 
        lastName="Hernandex", 
        username="Mary", 
        email="mary@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=18KRTd3b3JLEZvO8iWa9VdaDkaDNkfCWJ"),
    User(
        firstName="James", 
        lastName="Johnson", 
        username="James", 
        email="james@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1sgQZrWnoVK3xEiIGZNazEWOnrWxcZgjT"),
    User(
        firstName="David", 
        lastName="Rodriguez", 
        username="David", 
        email="david@aa.io", 
        password="password", 
        icon="http://drive.google.com/uc?export=view&id=1celf73KA4Fb3XQLA7t9An6qGR-Pm_XUO"),
]

def seed_users():
    for user in users:
        # demo = User(firstName="Demo{i}", lastName="User{i}", username="demouser{i}", email="demo{i}@aa.io", password="password", icon="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3")
        db.session.add(user)
    # user = User.query.get(4)
    # user.saves = "1, 2, 3, 4, 5"
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
    