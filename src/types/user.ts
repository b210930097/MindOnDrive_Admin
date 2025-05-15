export type WorkStatus =
  | 'Бэлэн биш'
  | 'Бэлэн'
  | 'Хүлээгдэж байна'
  | 'Ажиллах боломжгүй';
export type DetectionStatus =
  | 'Тодорхойгүй'
  | 'Зүүрмэглэсэн'
  | 'Сатаарсан'
  | 'Сэрүүн';

export type StepStatus = 'not_started' | 'doing' | 'done';

export interface User {
  uid: string;
  workerId: string;
  image: string;
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
  checklistStatus?: {
    driver: StepStatus;
    vehicle: StepStatus;
    confirmed: StepStatus;
  };
}
