import { DzireItemInterface } from './dzire-item.interface';

export interface DzireInterface {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  createDate: Date;
  items: DzireItemInterface[];
  imageUrl?: string;
}
