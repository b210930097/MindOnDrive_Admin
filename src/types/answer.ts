export type Answer = {
  answerId: string;
  answer: string;
  userId: string;
  signature: string;
  isCorrect: boolean;
  isFix: boolean;
  vehiclePlate: string;
  questionId: string;
  question: string;
  companyId: string;
  companyName: string;
  createdAt: Date;
  createdBy: string;
};
