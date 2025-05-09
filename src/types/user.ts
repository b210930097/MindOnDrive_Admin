export type WorkStatus = 'Бэлэн' | 'Хүлээгдэж байна' | 'Ажиллах боломжгүй';
export type DetectionStatus = 'Зүүрмэглэсэн' | 'Сатаарсан' | 'Сэрүүн';

export interface User {
  uid: string;
  role: string;
  workStatus: WorkStatus | null;
  detectionStatus: DetectionStatus | null;
  lastName: string | null;
  firstName: string | null;
  email: string;
  phone: string;
  signature: string | null;
  birthdate: string | null;
  isTerms: boolean;
  companyId: string;
  companyName: string;
  createdAt: string;
  createdBy: string;
  // checklistStatus?: {
  //   driver: boolean;
  //   vehicle: boolean;
  //   confirmed: boolean;
  // };
}
