export type Phase = 'CONSENT' | 'DEMOGRAPHICS' | 'CCMQ' | 'TONGUE' | 'RESULTS';

export interface Demographics {
  age: number | '';
  gender: 'Male' | 'Female' | '';
  race: string;
}

export interface TongueData {
  coatingColor: 'White' | 'Yellow' | '';
  texture: 'Greasy' | 'Thin' | 'Peeled' | '';
  bodyColor: 'Pale' | 'Red' | 'Purple' | '';
}

export interface AppState {
  phase: Phase;
  consentGiven: boolean;
  demographics: Demographics;
  ccmqAnswers: Record<number, number>; // questionId -> 1-5
  tongueData: TongueData;
}
