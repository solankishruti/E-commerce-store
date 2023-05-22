import React, { Fragment } from 'react';
import Router from 'next/router';
import {wrapper} from '../store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';


const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <ToastContainer />
    <Component {...pageProps} />
  </Fragment>
);

export default wrapper.withRedux(MyApp);