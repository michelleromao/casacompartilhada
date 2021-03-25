export default interface IndexBillDTO {
  id: string;
  name: string;
  responsible_id: string;
  due: string;
  value: number;
  home: boolean;
  status: boolean;
  creator_id: string;
  home_id: string;
}
