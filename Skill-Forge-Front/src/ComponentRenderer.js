import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js"


import ServiceLandingPage from "demos/ServiceLandingPage.js";

import ServiceLandingPageImageSrc from "images/demo/ServiceLandingPage.jpeg";

import trainingList from 'components/trainingContent/trainingList';

import trainingDetails from 'components/trainingContent/trainingDetails';
export const components = {
  landingPages: {
  
    ServiceLandingPage: {
      component: ServiceLandingPage,
      imageSrc: ServiceLandingPageImageSrc,
      url: "/components/landingPages/ServiceLandingPage",
    },
 
  },
 
  pages: {
  
    TrainingListPage: {
      component: trainingList,
      
      url: "/components/pages/TrainingListPage",
    },
    // TrainingDetails: {
    //   component: trainingDetails,
      
    //   url: "/components/pages/TrainingDetails/:id",
    // },
 
  },
 
 
}

export default () => {
  const { type, subtype, name } = useParams()

  try {
    let Component = null;
    if(type === "blocks" && subtype) {
      Component= components[type][subtype]["elements"][name].component
      return <AnimationRevealPage disabled>
          <Component/>
        </AnimationRevealPage>
    }
    else
      Component= components[type][name].component

    if(Component)
      return <Component/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
