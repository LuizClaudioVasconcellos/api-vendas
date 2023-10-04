import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

/**
 * @openapi
 * components:
 *   schema:
 *     ListUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         avatar:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *       example:
 *         userResponseDTO:
 *           - id: 1
 *             name: "PTK"
 *             email: "ptk@vomitou.com"
 *             avatar: "http://localhost:3333/files/969564bb96740588216f-Vana Studio - Hyperrealistic portrait of as a demonic god, wearing a demon … 3.png"
 *             created_at: "2023-09-19T18:28:32.118Z"
 *             updated_at: "2023-09-20T23:30:13.274Z"
 *           - id: 3
 *             name: "Shrek"
 *             email: "shrek@gmail.com"
 *             avatar: null
 *             created_at: "2023-09-21T00:15:05.373Z"
 *             updated_at: "2023-09-21T00:15:05.373Z"
 *           - id: 2
 *             name: "luiz"
 *             email: "luiz@gmail.com"
 *             avatar: "http://localhost:3333/files/620526eff47e300fc240-00bf60c4153911ee97e076634f4cece5.jpg"
 *             created_at: "2023-09-20T23:55:08.390Z"
 *             updated_at: "2023-09-21T01:26:47.723Z"
 */

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
