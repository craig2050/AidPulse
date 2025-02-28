export const data = {
    "personal_information.first_name": {
      prompt: "Create a question to ask for the victim's first name. This is required to identify the victim.",
      question: "What is the victim's first name?",
      value: ""
    },
    "personal_information.last_name": {
      prompt: "Create a question to ask for the victim's last name. This is required to identify the victim.",
      question: "What is the victim's last name?",
      value: ""
    },
    "personal_information.date_of_birth": {
      prompt: "Create a question to ask for the victim's date of birth in YYYY-MM-DD format. This is required to verify the age of the victim.",
      question: "What is the victim's date of birth? Please enter it in YYYY-MM-DD format.",
      value: ""
    },
    "personal_information.gender": {
      prompt: "Create a question to ask for the victim's gender. This is required to identify the gender of the victim.",
      question: "What is the victim's gender?",
      value: ""
    },
    "personal_information.national_id": {
      prompt: "Create a question to ask for the victim's National ID or SSN. This is optional but helps to uniquely verify the victim's identity.",
      question: "What is the victim's National ID or SSN? (Optional)",
      value: ""
    },
    "contact_information.phone_number": {
      prompt: "Create a question to ask for the victim's phone number. This is required to contact the victim.",
      question: "What is the victim's phone number?",
      value: ""
    },
    "contact_information.email": {
      prompt: "Create a question to ask for the victim's email address. This is optional for contacting the victim.",
      question: "What is the victim's email address? (Optional)",
      value: ""
    },
    "contact_information.emergency_contact_name": {
      prompt: "Create a question to ask for the name of an emergency contact. This is required.",
      question: "What is the name of an emergency contact person?",
      value: ""
    },
    "contact_information.emergency_contact_phone": {
      prompt: "Create a question to ask for the phone number of an emergency contact. This is required.",
      question: "What is the phone number of the emergency contact person?",
      value: ""
    },
    "location_information.address": {
      prompt: "Create a question to ask for the victim's residential address. This is required to identify the victim's residence for assistance.",
      question: "What is the victim's residential address?",
      value: ""
    },
    "location_information.coordinates": {
      prompt: "Create a question to ask for the victim's geolocation, including latitude and longitude. This is optional but helps to pinpoint the victim's exact location for response teams.",
      question: "What are the victim's geolocation coordinates (latitude and longitude)? (Optional)",
      value: ""
    },
    "location_information.temporary_shelter": {
      prompt: "Create a question asking if the victim is at a temporary shelter, and if so, to provide the location. This is optional.",
      question: "If the victim has relocated to a temporary shelter, what is the location of the shelter? (Optional)",
      value: ""
    },
    "household_information.adults": {
      prompt: "Create a question to ask for the number of adults in the victim's household. This is required to determine the total number of adults needing assistance.",
      question: "How many adults are in the household?",
      value: ""
    },
    "household_information.children": {
      prompt: "Create a question to ask for the number of children in the victim's household.  This is required to determine the number of children affected.",
      question: "How many children are in the household?",
      value: ""
    },
    "household_information.elderly": {
      prompt: "Create a question to ask for the number of elderly individuals in the victim's household. This is required to prioritize support.",
      question: "How many elderly individuals are in the household?",
      value: ""
    },
    "household_information.pets": {
      prompt: "Create a question to ask for the number of pets in the victim's household. This is optional for assisting in rescuing and care.",
      question: "How many pets are in the household? (Optional)",
      value: ""
    },
    "utility_information.utility_type": {
      prompt: "Create a question to ask for type or types of utilities that are needed. This is to help determine what assistance to provide.",
      question: "What type of utility assistance is needed (e.g., Gas, Electric)?",
      value: ""
    },
    "disaster_information.disaster_type": {
      prompt: "Create a question to categorize the type of emergency/disaster the victim is reporting.",
      question: "What type of disaster are you reporting?",
      value: ""
    },
    "disaster_information.fire_active": {
      prompt: "Create a yes/no question to ask the user if a fire is still active. This helps to determine the urgency.",
      question: "Is the fire still active? (Yes/No)",
      value: ""
    },
    "disaster_information.damage_level": {
      prompt: "Create a question to ask about the damage level. This is for assessing the severity of the situation",
      question: "What is the level of damage?",
      value: ""
    },
    "disaster_information.hazards": {
      prompt: "Create a question to ask about any known hazards such as gas leaks, power lines, or chemicals. This is to warn the responders.",
      question: "Are there any known hazards, such as gas leaks, downed power lines, or chemicals? (Optional)",
      value: ""
    },
    "disaster_information.safe_exit": {
      prompt: "Create a yes/no question to ask if there's a safe exit available. This helps assess if the victims can evacuate safely.",
      question: "Is there a safe exit available? (Yes/No)",
      value: ""
    },
    "assistance_information.medical_assistance": {
      prompt: "Create a yes/no question to ask the user if medical assistance is needed.",
      question: "Is medical assistance needed? (Yes/No)",
      value: ""
    },
    "assistance_information.shelter_assistance": {
      prompt: "Create a yes/no question to ask the user if shelter assistance is needed.",
      question: "Is shelter assistance needed? (Yes/No)",
      value: ""
    },
    "assistance_information.food_assistance": {
      prompt: "Create a yes/no question to ask the user if food assistance is needed.",
      question: "Is food assistance needed? (Yes/No)",
      value: ""
    },
    "assistance_information.water_assistance": {
      prompt: "Create a yes/no question to ask the user if water assistance is needed.",
      question: "Is water assistance needed? (Yes/No)",
      value: ""
    },
    "assistance_information.other_needs": {
      prompt: "Create a question to ask for any other assistance needs not covered.",
      question: "Are there any other assistance needs? (Optional)",
      value: ""
    },
    "timestamp.report_time": {
      prompt: "Create a question to ask for the time the incident was reported, in YYYY-MM-DDTHH:MM:SSZ format.",
      question: "What is the time the incident is being reported? Please enter it in YYYY-MM-DDTHH:MM:SSZ format.",
      value: ""
    }
  }
  