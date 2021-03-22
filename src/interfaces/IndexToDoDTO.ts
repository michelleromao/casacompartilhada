export default interface IndexToDoDTO {
  id: string;
  task: string;
  frequency: string;
  day_of_week: string;
  day_of_month: number;
  creator_id: string;
  home_id: string;
  created_at: string,
  updated_at?: string,
}
