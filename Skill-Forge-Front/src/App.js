import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line


import ComponentRenderer from "ComponentRenderer.js";
import ThankYouPage from "ThankYouPage.js";
import ServiceLandingPage from "demos/ServiceLandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingContentList from "components/trainingContent/trainingList";
import TrainingDetails from "components/trainingContent/trainingDetails";
import MediaMaterials from "components/trainingContent/mediaMaterials";
export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  // const [isLogin, token] = useAuth();
  // console.log(token);
  // return isLogin ? <Protected token={token} /> : <Public />;
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* <Route path="/components/:type/:subtype/:name/:id" element={<ComponentRenderer />} />
          <Route path="/components/:type/:name" element={<ComponentRenderer />} /> */}
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/trainingList" element={<TrainingContentList/>} />
          <Route path="/TrainingDetails/:id" element={<TrainingDetails/>} />
          <Route path="/:id/mediasList" element={<MediaMaterials/>} />
          <Route path="/" element={<ServiceLandingPage />} />
        </Routes>
      </Router>
    </>
  );
}

