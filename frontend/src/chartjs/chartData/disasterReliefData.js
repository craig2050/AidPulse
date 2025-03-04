import disasterReliefData from '../../data/disaster_relief.victims.json';

// Process disaster type distribution
export const getDisasterTypeDistribution = () => {
  const disasterCounts = {};
  
  disasterReliefData.forEach(victim => {
    const disasterType = victim.disaster_information.disaster_type;
    if (disasterType) {
      disasterCounts[disasterType] = (disasterCounts[disasterType] || 0) + 1;
    }
  });
  
  return disasterCounts;
};

// Process household composition data
export const getHouseholdComposition = () => {
  let totalAdults = 0;
  let totalChildren = 0;
  let totalElderly = 0;
  let totalPets = 0;
  let count = 0;
  
  disasterReliefData.forEach(victim => {
    if (victim.household_information) {
      totalAdults += victim.household_information.adults || 0;
      totalChildren += victim.household_information.children || 0;
      totalElderly += victim.household_information.elderly || 0;
      totalPets += victim.household_information.pets || 0;
      count++;
    }
  });
  
  return {
    adults: Math.round((totalAdults / count) * 10) / 10,
    children: Math.round((totalChildren / count) * 10) / 10,
    elderly: Math.round((totalElderly / count) * 10) / 10,
    pets: Math.round((totalPets / count) * 10) / 10
  };
};

// Process utility outage data
export const getUtilityOutages = () => {
  const utilityCounts = {};
  
  disasterReliefData.forEach(victim => {
    const utilityType = victim.utility_information?.utility_type;
    if (utilityType) {
      utilityCounts[utilityType] = (utilityCounts[utilityType] || 0) + 1;
    }
  });
  
  return utilityCounts;
};

// Process medical assistance needs
export const getMedicalAssistanceNeeds = () => {
  let needsMedical = 0;
  let noMedicalNeeds = 0;
  let unknown = 0;
  
  disasterReliefData.forEach(victim => {
    if (victim.assistance_information?.medical_assistance === true) {
      needsMedical++;
    } else if (victim.assistance_information?.medical_assistance === false) {
      noMedicalNeeds++;
    } else {
      unknown++;
    }
  });
  
  return {
    "Needs Medical Assistance": needsMedical,
    "No Medical Needs": noMedicalNeeds,
    "Unknown": unknown
  };
};

// Process temporary shelter data
export const getTemporaryShelterStatus = () => {
  let inShelter = 0;
  let inOriginalHome = 0;
  
  disasterReliefData.forEach(victim => {
    if (victim.location_information?.temporary_shelter && victim.location_information.temporary_shelter !== "") {
      inShelter++;
    } else {
      inOriginalHome++;
    }
  });
  
  return {
    "In Temporary Shelter": inShelter,
    "In Original Home": inOriginalHome
  };
};

// Process gender distribution
export const getGenderDistribution = () => {
  const genderCounts = {};
  
  disasterReliefData.forEach(victim => {
    const gender = victim.personal_information?.gender;
    if (gender) {
      genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    }
  });
  
  return genderCounts;
};
