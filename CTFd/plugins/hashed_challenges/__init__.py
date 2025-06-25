from CTFd.plugins.challenges import BaseChallenge, CHALLENGE_CLASSES
from CTFd.plugins import register_plugin_assets_directory
from CTFd.models import db, Flags
from CTFd.utils.user import get_current_team
from flask import request
import hashlib

class HashedChallenge(BaseChallenge):
    id = "hashed"
    name = "hashed"
    templates = {
        'create': '/plugins/hashed_challenges/assets/create.html',
        'update': '/plugins/hashed_challenges/assets/update.html',
        'view': '/plugins/hashed_challenges/assets/view.html',
    }
    scripts = {
        'create': '/plugins/hashed_challenges/assets/create.js',
        'update': '/plugins/hashed_challenges/assets/update.js',
        'view': '/plugins/hashed_challenges/assets/view.js',
    }

    @staticmethod
    def attempt(challenge, request):
        data = request.form or request.get_json()
        submission = data["submission"].strip()
        
        team = get_current_team()
        if not team:
            return False, "No team found"
            
        flags = Flags.query.filter_by(challenge_id=challenge.id).all()
        
        for flag in flags:
            correct_answer = flag.content
            answer_with_team = f"{correct_answer}{team.name}"
            expected_hash = hashlib.sha256(answer_with_team.encode()).hexdigest()
            
            if submission.lower() == expected_hash.lower():
                return True, "Correct"
                
        return False, "Incorrect"

def load(app):
    CHALLENGE_CLASSES["hashed"] = HashedChallenge
    register_plugin_assets_directory(app, base_path="/plugins/hashed_challenges/assets/")
    print("✅ Hashed Challenges plugin loaded successfully!")
