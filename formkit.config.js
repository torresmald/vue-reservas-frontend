import {generateClasses} from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                wrapper: 'space-y-2 mb-3',
                message: 'bg-red-500 text-white text-center text-sm font-bold uppercase p-2 my-5',
                label: 'block mb-1 font-bold text-lg text-white',
                input: 'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 flex-1',
                inner: 'flex',
                suffixIcon: 'text-blue-500 w-12 h-12 relative -translate-x-14 translate-y'
            },
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white p-3 mt-10 w-full'
            }
        })
    }
}

export default config