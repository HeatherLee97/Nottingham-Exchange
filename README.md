# Nottingham-Exchange

 Set Up Python & Flask
 Activate the virtual environment:

Windows:

venv\Scripts\activate

macOS/Linux:
source venv/bin/activate


Install Flask and other Python dependencies:
pip install -r requirements.txt


If there's no requirements.txt, you can install Flask manually:
pip install flask


Set Up npm
Navigate to the frontend or relevant folder (if applicable):
cd frontend


Install npm dependencies:
npm install

Run the Project
Start Flask Server:
From the root directory (or wherever your Flask app lives):
flask run

Make sure your FLASK_APP is set. You can export it like so:
export FLASK_APP=app.py  # or your main Flask file

Start npm (e.g., React or other frontend app):
npm start


Required Design Documents
The following documentation is required for your group project.

Features List / MVP
DataBase Schema (both tables and the diagram with relationships)
User Stories
Scrum Board (either Github projects or something like Trello/Asana/Habitica)
Wire Frames (if you are making an original site)
All Documentation needs to be added to your project repo's wiki page. Do NOT make or add this info to a README.md in your repo, the project starter will come with a very important README.md that we will merge in to our group project repos. If you have something ready for review, let your advisor know (in your group's slack channel). Do not move on to the next documentation deliverable without getting the previous one approved (if your feature list is not approved, don't start on the DB schema)

Daily Planning Schedule
The following schedule is when your different design documents are due throughout the week(s) leading up to the project week(s):

Full-Time
Day	Tasks to Work On	Design Docs Due
Monday	Select Project, Feature List	What site to clone
Tuesday	Feature List, DB Schema	Feature List
Wednesday	DB Schema, User Stories	DB Schema
Thursday	User Stories, Wire Frames (if your site is original)Set up Scrum Board (GitHub Projects)	User Stories
Friday	Release & Review Project Starter	Scrum Board
Code, code, code!
Once those are done, your team is set up for success! Determine whether you want to work on features together, one at a time, or have pairs work on features together, or if everyone in the group gets their own feature.

Be smart about your Git workflow. Create branches, commit to them, then create Pull Requests on GitHub to let others see your changes.

Your group needs to commit AT LEAST twice per day with substantial code.

Coordinate many times per day so everyone knows what's going on.

Keep up the communication.

Don't let someone fail. This is a team effort.

Evaluating your completion
Full-stack projects will be evaluated against the following "Minimal Viable Product" features.

New account creation, login, and guest/demo login
A production README file for your GitHub repository containing
Brief explanation of what the app is and does
Link to live site
Discussion of technologies used
Discussion of two features that show off the team's technical abilities
Discussion of both challenges faced and the way the team solved them
Code snippets to highlight the best code
Hosting on Render.com
For four features:
2 features must be full CRUD, the other 2 features can be partial CRUD
Adequate styling
Smooth, bug-free navigation
Adequate and appropriate seed data to demonstrate the feature
In order for this to be considered complete, you must have the first three criteria completed. In addition to that, you will also need to have four of your features demonstrating the checklist under item 4. After the following section is a list of required features if you decide to clone one of the sites from the list above.
