import generate from 'babel-generator';

export default (path) => {
    const { node } = path;
    //FunctionExpression doesn't have id
    return (node.id ? node.id.name : 'function') + getParametersCode(node.params);
}

export const getParametersCode = (params) => {
    return `(${ params.map(p => p.name).join(', ') })`
};