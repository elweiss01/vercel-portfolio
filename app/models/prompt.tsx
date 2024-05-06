
interface Prompt {
    type?: string,
    name?: string,
    history?: string,
    context?: string,
    input_variables?:  string[],
    partial_variables?: string[],
    prompt?: string,
    template?: string
}

export default Prompt