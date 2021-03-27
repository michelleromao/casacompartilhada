export default interface UpdateUserDTO {
  username: string;
  email: string;
  password: string;
  new_password?: string;
  home_id: string;
}
