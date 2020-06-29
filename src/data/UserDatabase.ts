import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async signUp(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
        })
        .into("LabookUsers");
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("LabookUsers")
      .where({ email });

    return result[0];
  }

  public async isFriend(req_friend: string, res_friend: string): Promise<any> {
    const isfriend = await this.getConnection().raw(`
    SELECT * FROM LaFriends 
    WHERE (req_friend = "${req_friend}" AND res_friend = "${res_friend}")
    OR (res_friend = "${req_friend}" AND req_friend = "${res_friend}")
    `);

    return isfriend[0][0];
  }

  public async addFriend(
    req_friend: string,
    res_friend: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        req_friend,
        res_friend,
      })
      .into("LaFriends");
  }

  public async deleteFriend(
    req_friend: string,
    res_friend: string
  ): Promise<void> {
    await this.getConnection().raw(`
      DELETE FROM LaFriends
      WHERE (req_friend = "${req_friend}" AND res_friend = "${res_friend}")
      OR (res_friend = "${req_friend}" AND req_friend = "${res_friend}")
    `);
  }
}
