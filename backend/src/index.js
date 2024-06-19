'use strict';
import cors from 'cors';
import express from 'express';
const app = express();


app.use(cors({
  origin: 'https://your-netlify-domain.netlify.app'
}));

export function register( /*{ strapi }*/) { }
export function bootstrap( /*{ strapi }*/) { }
