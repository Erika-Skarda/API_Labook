import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness {
  private userDatabase = new UserDatabase();

  public async signUp(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    await this.userDatabase.signUp(id, name, email, password);
  }

  public async addFriend(req_friend: string, res_friend: string) {
    await this.userDatabase.addFriend(req_friend, res_friend)
  }

  public async deleteFriend(req_friend: string, res_friend: string) {
    await this.userDatabase.deleteFriend(req_friend, res_friend)
  }
}
