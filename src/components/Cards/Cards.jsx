import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import Countup from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  //console.log(confirmed);

  const arr = [
    [confirmed, "Confirmed"],
    [recovered, "Recovered"],
    [deaths, "Deaths"],
  ];

  if (!confirmed) {
    return "Loading...";
  }

  return (
    <div>
      <Grid container spacing={3} justify="center">
        {arr.map((data, index) => (
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.Cards, data[1])}
            key={index}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {/* used for text */}
                {/* gutterBottom: nice padding of the buttom */}
                {data[1]}
              </Typography>
              <Typography variant="h5">
                <Countup
                  start={0}
                  end={data[0].value}
                  duration={2}
                  separator=","
                />
              </Typography>
              <Typography color="textSecondary">
                {"Last updata: "}
                {new Date(lastUpdate).toDateString()}
              </Typography>
              {/* <Typography variant="body2">
                      Number of recoveries from COVID-19
                    </Typography> */}
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;
