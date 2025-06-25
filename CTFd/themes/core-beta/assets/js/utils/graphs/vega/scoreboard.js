import { cumulativeSum } from "../math";

export function getSpec(description, values) {
  const pokemonPalette = ['#ffd733', '#3B4CCA', '#E3350D', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'];

  let spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: description,
    data: { values: values },
    width: "container",
    background: "transparent",
    config: {
      view: {
        stroke: "transparent"
      },
      style: {
        "guide-label": {
          fill: "#ffd733"
        },
        "guide-title": {
          fill: "#ffd733"
        }
      },
      axis: {
        domainColor: "#3B4CCA",
        gridColor: "rgba(255,255,255,0.1)",
        tickColor: "#3B4CCA"
      },
      legend: {
        labelColor: "#ffd733",
        titleColor: "#ffd733"
      }
    },
    mark: {
      type: "line",
      strokeWidth: 3,
      tooltip: true
    },
    encoding: {
      x: { field: "date", type: "temporal", title: "Time" },
      y: { field: "score", type: "quantitative", title: "Score", scale: { zero: true } },
      color: {
        field: "name",
        type: "nominal",
        legend: {
          orient: "bottom",
          offset: 20
        },
        scale: {
          range: pokemonPalette
        }
      },
    },
  };
  return spec;
}

export function getValues(scoreboardDetail) {
  const teams = Object.keys(scoreboardDetail);
  let values = [];

  for (let i = 0; i < teams.length; i++) {
    const team = scoreboardDetail[teams[i]];
    const team_score = [];
    const times = [];
    for (let j = 0; j < team["solves"].length; j++) {
      team_score.push(team["solves"][j].value);
      times.push(team["solves"][j].date);
      // const date = dayjs(team["solves"][j].date);
      // times.push(date.toDate());
    }

    const total_scores = cumulativeSum(team_score);
    const team_name = team["name"];
    let scores = times.map(function (e, i) {
      return {
        name: team_name,
        score: total_scores[i],
        date: e,
      };
    });
    values = values.concat(scores);
  }

  return values;
}
