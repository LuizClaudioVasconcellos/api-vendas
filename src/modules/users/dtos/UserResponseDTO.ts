import { Expose } from 'class-transformer';

export default class UserResponseDTO {
  @Expose()
  public id: number;
  @Expose()
  public name: string;
  @Expose()
  public email: string;
  @Expose()
  private avatar: string | null;
  @Expose()
  public created_at: Date;
  @Expose()
  public updated_at: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    avatar: string | null,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  @Expose()
  get avatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}
