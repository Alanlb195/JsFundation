


export class CreateTodoDTO {


    private constructor(
        public readonly text: string,
    ) {

    }

    static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {

        const { text } = props;


        if (!text || text.length < 1) return ['Text property is required', undefined];


        return [undefined, new CreateTodoDTO(text)];
    }

}