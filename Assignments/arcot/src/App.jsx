// App.jsx
import { Chart , defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
// Import necessary dependencies from React and Redux
import "./App.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import selector functions to retrieve data from Redux store
import { selectAiData, selectAiDataError } from "./app/selectors";

// Import action creators for fetching AI data
import { fetchAiDataFailure, fetchAiDataSuccess } from "./app/actionTypes";
import { AiData } from "./app/types";


defaults.maintainAspectRatio = false
defaults.responsive = true
defaults.plugins.title.display = true
defaults.plugins.title.size = 20;


// Define the main component
function App() {
  // Initialize Redux dispatch function and selector hooks
  const dispatch = useDispatch();
  const aiData = useSelector(selectAiData);
  const error = useSelector(selectAiDataError);

  // Fetch data directly when the component mounts
  React.useEffect(() => {
    (async () => {
      try {
        // Simulate fetching data from an API
        const response = await fetch("/ai-data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Dispatch success action with fetched data
        dispatch(fetchAiDataSuccess(data));
      } catch (error) {
        // Dispatch failure action with error message
        dispatch(fetchAiDataFailure(error.message));
      }
    })();
  }, [dispatch]); // Dependency array ensures effect runs only once on mount

  // Log fetched AI data for debugging

  console.log(AiData);

  // Render the UI components
  return (
    <>
      <p className="dashb">Dashboard</p>
      <div className="cardWrapper1">
        <Bar
          data={{
            labels: Object.keys(AiData.category_distribution).map((key) => key),
            datasets: [
              {
                label: "User",
                data: Object.values(AiData.category_distribution),
              },
            ],
          }}
          options={{
            plugins:{
              title:{
                text:"User Querise Category Distribution"
              }
            }
          }}
        />
      </div>
      <div className="wrapper">
        <div className="cardWrapper2">
          <Line
            data={{
              labels: AiData.response_times.day_wise.map((item) => item.date),
              datasets: [
                {
                  label: "Day wise",
                  data: AiData.response_times.day_wise.map(
                    (item) => item.average_time
                  ),
                },
              ],
            }}
            options={{
              plugins:{
                title:{
                  text:"Response time trend over days"
                }
              }
            }}
          />
        </div>
        <div className="cardWrapper3">
          <Line
            data={{
              labels: AiData.response_times.week_wise.map((item) => item.week),
              datasets: [
                {
                  label: "Time wise",
                  data: AiData.response_times.week_wise.map(
                    (item) => item.average_time
                  ),
                },
              ],
            }}
            options={{
              plugins:{
                title:{
                  text:"Response time trend over weeks"
                }
              }
            }}
          />
        </div>
        <div className="cardWrapper4">
          <Pie
            data={{
              labels: AiData.user_satisfaction.ratings.map(
                (item) => item.rating
              ),
              datasets: [
                {
                  label: "Rating",
                  data: AiData.user_satisfaction.ratings.map(
                    (item) => item.count
                  ),
                },
              ],
            }}
            options={{
              plugins:{
                title:{
                  text:"Users Rating on the basis of their statisfaction"
                }
              }
            }}
          />
        </div>
        <div className="cardWrapper5">
          <Doughnut
            data={{
              labels: Object.keys(AiData.usage_statistics.by_platform).map(
                (key) => key
              ),
              datasets: [
                {
                  label: "Platform",
                  data: Object.values(AiData.usage_statistics.by_platform),
                },
              ],
            }}
            options={{
              plugins:{
                title:{
                  text:"Usage Statistics On the basis of Platforms"
                }
              }
            }}
          />
        </div>
        <div className="cardWrapper6">
          <PolarArea
            data={{
              labels: Object.keys(AiData.usage_statistics.by_country).map(
                (key) => key
              ),
              datasets: [
                {
                  label: "Country",
                  data: Object.values(AiData.usage_statistics.by_country),
                },
              ],
            }}
            options={{
              plugins:{
                title:{
                  text:"Usage Statistics On the basis of Country"
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App; // Export the main component
