import { Validators } from '../../../config/validator'

export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly category: string, // ID de la categoría
        public readonly user: string, // ID del usuario
        public readonly description?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, available, price, description, category, user } = props;

        if (!name || typeof name !== "string") return ["Name is required and must be a string"];


        const availableBoolean = available === "true" ? true : available === "false" ? false : null;
        if (availableBoolean === null) return ["Available must be either 'true' or 'false'"];


        const priceNumber = Number(price);
        if (isNaN(priceNumber) || priceNumber < 0) return ["Price must be a number greater than or equal to 0"];

        if (description && typeof description !== "string") return ["Description must be a string"];

        if (!Validators.isMongoId(category)) return ["Category must be a valid MongoDB ObjectId"];

        if (!Validators.isMongoId(user.id)) return ["User must be a valid MongoDB ObjectId"];

        return [undefined, new CreateProductDto(name, availableBoolean, price, category, user.id, description)];
    }
}
