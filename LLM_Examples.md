
| Dictionary Field | Prompt | Question |
|---|---|---|
| `personal_information.first_name` | "Create a question to ask for the victim's first name. This is required to identify the victim." | "What is the victim's first name?" |
| `personal_information.last_name` | "Create a question to ask for the victim's last name. This is required to identify the victim." | "What is the victim's last name?" |
| `personal_information.date_of_birth` | "Create a question to ask for the victim's date of birth in YYYY-MM-DD format. This is required to verify the age of the victim." | "What is the victim's date of birth? Please enter it in YYYY-MM-DD format." |
| `personal_information.gender` | "Create a question to ask for the victim's gender.  This is required to identify the gender of the victim." | "What is the victim's gender?" |
| `personal_information.national_id` | "Create a question to ask for the victim's National ID or SSN. This is optional but helps to uniquely verify the victim's identity." | "What is the victim's National ID or SSN? (Optional)" |
| `contact_information.phone_number` | "Create a question to ask for the victim's phone number. This is required to contact the victim." | "What is the victim's phone number?" |
| `contact_information.email` | "Create a question to ask for the victim's email address. This is optional for contacting the victim." | "What is the victim's email address? (Optional)" |
| `contact_information.emergency_contact_name` | "Create a question to ask for the name of an emergency contact. This is required." | "What is the name of an emergency contact person?" |
| `contact_information.emergency_contact_phone` | "Create a question to ask for the phone number of an emergency contact. This is required." | "What is the phone number of the emergency contact person?" |
| `location_information.address` | "Create a question to ask for the victim's residential address. This is required to identify the victim's residence for assistance." | "What is the victim's residential address?" |
| `location_information.coordinates` | "Create a question to ask for the victim's geolocation, including latitude and longitude. This is optional but helps to pinpoint the victim's exact location for response teams." | "What are the victim's geolocation coordinates (latitude and longitude)? (Optional)" |
| `location_information.temporary_shelter` | "Create a question asking if the victim is at a temporary shelter, and if so, to provide the location. This is optional." | "If the victim has relocated to a temporary shelter, what is the location of the shelter? (Optional)" |
| `household_information.adults` | "Create a question to ask for the number of adults in the victim's household. This is required to determine the total number of adults needing assistance." | "How many adults are in the household?" |
| `household_information.children` | "Create a question to ask for the number of children in the victim's household.  This is required to determine the number of children affected." | "How many children are in the household?" |
| `household_information.elderly` | "Create a question to ask for the number of elderly individuals in the victim's household. This is required to prioritize support." | "How many elderly individuals are in the household?" |
| `household_information.pets` | "Create a question to ask for the number of pets in the victim's household. This is optional for assisting in rescuing and care." | "How many pets are in the household? (Optional)" |
| `utility_information.utility_type` | "Create a question to ask for type or types of utilities that are needed. This is to help determine what assistance to provide." | "What type of utility assistance is needed (e.g., Gas, Electric)?" |
| `disaster_information.disaster_type` | "Create a question to categorize the type of emergency/disaster the victim is reporting." | "What type of disaster are you reporting?" |
| `disaster_information.fire_active` | "Create a yes/no question to ask the user if a fire is still active. This helps to determine the urgency." | "Is the fire still active? (Yes/No)" |
| `disaster_information.damage_level` | "Create a question to ask about the damage level. This is for assessing the severity of the situation" | "What is the level of damage?" |
| `disaster_information.hazards` | "Create a question to ask about any known hazards such as gas leaks, power lines, or chemicals. This is to warn the responders." | "Are there any known hazards, such as gas leaks, downed power lines, or chemicals? (Optional)" |
| `disaster_information.safe_exit` | "Create a yes/no question to ask if there's a safe exit available. This helps assess if the victims can evacuate safely." | "Is there a safe exit available? (Yes/No)" |
| `assistance_information.medical_assistance` | "Create a yes/no question to ask the user if medical assistance is needed." | "Is medical assistance needed? (Yes/No)" |
| `assistance_information.shelter_assistance` | "Create a yes/no question to ask the user if shelter assistance is needed." | "Is shelter assistance needed? (Yes/No)" |
| `assistance_information.food_assistance` | "Create a yes/no question to ask the user if food assistance is needed." | "Is food assistance needed? (Yes/No)" |
| `assistance_information.water_assistance` | "Create a yes/no question to ask the user if water assistance is needed." | "Is water assistance needed? (Yes/No)" |
| `assistance_information.other_needs` | "Create a question to ask for any other assistance needs not covered." | "Are there any other assistance needs? (Optional)" |
| `timestamp.report_time` | "Create a question to ask for the time the incident was reported, in YYYY-MM-DDTHH:MM:SSZ format." | "What is the time the incident is being reported? Please enter it in YYYY-MM-DDTHH:MM:SSZ format." |