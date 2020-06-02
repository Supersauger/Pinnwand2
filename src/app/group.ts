export interface Group {
  name: string;
  _id: string;
  nutzer_ids: string[];
  admin_id: string;
  privat: boolean;
}
