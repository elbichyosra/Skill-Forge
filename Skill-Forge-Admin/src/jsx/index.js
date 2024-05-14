import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from './pages/ScrollToTop';
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Jobs from "./components/Dashboard/Jobs";
import Applications from "./components/Dashboard/Applications";
import MyProfile from "./components/Dashboard/MyProfile";
import Statistics from "./components/Dashboard/Statistics";
import Companies from "./components/Dashboard/Companies";
import Task from "./components/Dashboard/Task";

//Jobs
import JobLists from "./components/Jobs/JobLists";
import JobView from "./components/Jobs/JobView";
import JobApplication from "./components/Jobs/JobApplication";
import ApplyJob from "./components/Jobs/ApplyJob";
import NewJob from "./components/Jobs/NewJob";
import UserProfile from "./components/Jobs/UserProfile";



/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";




/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

import Error403 from "./pages/Error403";
//Training Content
import TrainingContentList from "./components/trainingContent/trainingContentList";
import AddTrainingContent from "./components/trainingContent/addTrainingContent";
import EditTrainingContent from "./components/trainingContent/editTrainingContent";
import DetailsTrainingContent from "./components/trainingContent/trainingContentDetails";
import AssignTrainingContent from "./components/trainingContent/assignTrainingContent";
import UserProgressList from "./components/trainingContent/userProgressList";
//Media 
import MediaTable from"./components/mediaMaterial/mediaTable";
import MediaDetails from "./components/mediaMaterial/mediaDetails";
import { ThemeContext } from "../context/ThemeContext";



const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },
    { url: "search-jobs", component: Jobs },
    { url: "applications", component: Applications },
    { url: "my-profile", component: MyProfile },
    { url: "statistics", component: Statistics },
    { url: "companies", component: Companies },
    { url: "task", component: Task },
	
	//Jobs
    { url: "job-list", component: JobLists },
    { url: "job-view", component: JobView },
    { url: "job-application", component: JobApplication },
    { url: "apply-job", component: ApplyJob },
    { url: "new-job", component: NewJob },
    { url: "user-profile", component: UserProfile },
	

  
    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

   
 

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// table
	{ url: 'table-filtering', component: FilteringTable },
    { url: 'table-sorting', component: SortingTable },
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },
    { url: "page-error-403", component: Error403 },

    //training content
    { url: 'training-table', component: TrainingContentList },
    { url: 'new-training', component: AddTrainingContent },
    { url: ':id/edit-training', component: EditTrainingContent },
    { url: ':id/details-training', component: DetailsTrainingContent },
    { url: 'assign-training', component: AssignTrainingContent },
    { url: 'users-progress', component: UserProgressList},
    //media Material
    { url: ':trainingContentId/media-table', component: MediaTable },
    { url: ':id/media-details', component: MediaDetails},
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                 />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
   
	  <ScrollToTop />
    </>
  );
};

export default Markup;
