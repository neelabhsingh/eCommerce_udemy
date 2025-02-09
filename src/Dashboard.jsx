import React, { useEffect } from "react";

let Dashboard = (props) => {
  //execute only once on initial render= componentDidMount
  useEffect(() => {
    console.log("Component is mounted");
    document.title = "Dashboard - eCommerce";
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
