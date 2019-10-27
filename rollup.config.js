import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/content.js',
    output: {
        format: 'iife',
        file: 'bin/inject.js',
        name: 'getselector'
    },
    plugins: [
        resolve(),
        commonjs({
            exclude: [],
            include: [
                'node_modules/**'
            ]
        })
    ]
};
