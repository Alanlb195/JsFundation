import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }


    public async registerUser(reigsterUserDto: RegisterUserDto) {

        const existsUser = await UserModel.findOne({ email: reigsterUserDto.email });
        if (existsUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(reigsterUserDto);

            // Encriptar la contraseña
            user.password = bcryptAdapter.hash(reigsterUserDto.password);

            await user.save();

            // Email confirmation
            await this.sendEmailValidationLink(user.email);


            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id });
            if (!token) throw CustomError.internalServerError('Error while creating JWT');

            return {
                user: userEntity,
                token: token,
            };

        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError(`${error}`);
        }
    }


    public async loginUser(loginUserDto: LoginUserDto) {

        // Findone to verify if user exist, by  email because it have to be unique
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('Email does not exist.');

        // Validate password
        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatch) throw CustomError.badRequest('Password is not valid');


        const { password, ...userEntity } = UserEntity.fromObject(user);


        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServerError('Error while creating JWT');

        return {
            user: userEntity,
            token: token
        }


    }


    private sendEmailValidationLink = async (email: string): Promise<boolean> => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServerError('Error while creating JWT');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServerError('Error sending email');

        return true;
    }

    public validateEmail = async(token: string) => {

        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServerError('Email not in token');

        const user = await UserModel.findOne({ email });
        if(!user) throw CustomError.internalServerError('Email not exist');

        user.emailValidated = true;
        await user.save();

        return true;
    }

}