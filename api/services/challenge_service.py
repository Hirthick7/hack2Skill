# In-memory challenge store
challenges = [
  {
    'id': 'c1',
    'title': 'Public Transit Pioneer',
    'description': 'Use public transportation instead of driving for at least 3 days this week.',
    'difficulty': 'medium',
    'category': 'transportation',
    'points': 50,
    'completed': False
  },
  {
    'id': 'c2',
    'title': 'Lights Out',
    'description': 'Ensure all unnecessary lights and standby appliances are turned off before bed for a week.',
    'difficulty': 'easy',
    'category': 'energy',
    'points': 20,
    'completed': False
  },
  {
    'id': 'c3',
    'title': 'Plant-Based Day',
    'description': 'Eat entirely plant-based meals for one full day.',
    'difficulty': 'easy',
    'category': 'food',
    'points': 30,
    'completed': False
  },
  {
    'id': 'c4',
    'title': 'Zero Waste Weekend',
    'description': 'Produce zero single-use plastic waste for an entire weekend.',
    'difficulty': 'hard',
    'category': 'waste',
    'points': 100,
    'completed': False
  }
]

def get_challenges():
    return list(challenges)

def complete_challenge(challenge_id: str):
    for i, c in enumerate(challenges):
        if c['id'] == challenge_id:
            challenges[i]['completed'] = True
            return challenges[i]
    return None
