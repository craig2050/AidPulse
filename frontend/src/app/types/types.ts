export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}


export interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
}

export interface Section {
  data?: QuestionData[]
}

export interface QuestionData {
  DataElementName: string;
  DisplayName: string;
  PreferredFormat: string;
  Datatype: string;
  RationaleForCollecting: string;
  HelpfulInformationForCollecting: string;
  Priority: string;
}

export interface PrioritiesForCollection {
  PriorityLevel: string;
  DataElements: string[];
}

export interface QuestionsJson {
  dataElements: QuestionData[];
  enumeratedNeedsByDisasterType: Record<string, string[]>;
  prioritiesForCollection: PrioritiesForCollection[];
}

export interface LLMResponse {
  //TODO
  response: string;
}
