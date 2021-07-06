import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserService{
    async execute({name, email, admin} : IUserRequest){
        const usersRepositoriry = new UsersRepositories();

        if(!email){
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await usersRepositoriry.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error('User already exists');
        }

        const user = usersRepositoriry.create({
            name,
            email,
            admin
        });

        await usersRepositoriry.save(user);

        return user;
    }
}

export { CreateUserService };