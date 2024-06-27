// Card.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Card, CardProps } from './Card'; // Adjust the import path based on your project structure

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
            onMouseOver: { action: 'hovered over' },
            onMouseOut: { action: 'hovered out' },
        },
} as Meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;



export const Default = Template.bind({});

Default.args = {
    brand:"BrandName",
  title: "Product",
  description: "content goes here...",
  price: 1039,

};


 // Card.stories.tsx

// import React from 'react';
// import { Meta, StoryFn } from '@storybook/react';
// import { Card, CardProps } from './Card'; // Adjust the import path based on your project structure

// export default {
//     title: 'Components/Card',
//     component: Card,
//     argTypes: {
//         onMouseOver: { action: 'hovered over' },
//         onMouseOut: { action: 'hovered out' },
//     },
// } as Meta;

// const Template: StoryFn<CardProps> = (args) => (
    
// );

// export const Default = Template.bind({});

// <Card {...args}>
//         <div className="flex flex-col p-4">
//             <img
//                 src=""
//                 alt="Product"
//                 className="object-contain w-full h-64 mb-4"
//             />
//             <div className="flex items-center justify-between">
//                 <div>
//                     <p className="text-lg font-semibold">Brand</p>
//                     <p className="text-sm text-gray-500">PRODUCT NAME</p>
//                 </div>
//                 <p className="text-lg font-semibold">$20.00</p>
//             </div>
//             <p className="mt-2 text-sm text-gray-500 ">
//                 Product Description goes here....
//             </p>
//             <div className="flex justify-between mt-4">
//                     <button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
//                         +
//                     </button>
//                     <button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
//                         -
//                     </button>
//                     <button className="py-2 pl-12 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
//                         Add to cart
//                     </button>


//             </div>
//         </div>
//     </Card>
