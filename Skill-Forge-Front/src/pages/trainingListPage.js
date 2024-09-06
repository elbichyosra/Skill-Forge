import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TrainingContentList from 'components/trainingContent/trainingList';
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

export default () => {


  return (
    <AnimationRevealPage>
        <Header/>
      <TrainingContentList/>
      <Footer/>
     
    </AnimationRevealPage>
  );
}