import { colorHash } from "@ctfdio/ctfd-js/ui";
import { mergeObjects } from "../../objects";
import { cumulativeSum } from "../../math";
import dayjs from "dayjs";

export function getOption(mode, places, optionMerge) {
  const pokemonPalette = ['#ffd733', '#3B4CCA', '#E3350D', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'];
  let option = {
    color: pokemonPalette,
    backgroundColor: 'transparent',
    textStyle: {
      color: '#ffd733'
    },
    title: {
      left: "center",
      text: "Top 10 " + (mode === "teams" ? "Teams" : "Users"),
      textStyle: {
        color: '#ffd733',
        fontFamily: 'Pokemon Solid, sans-serif',
        fontSize: 20,
      }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#ffd733',
      textStyle: { color: '#ffd733' },
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      align: "left",
      bottom: 35,
      data: [],
      textStyle: { color: '#ffd733' }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: "time",
        boundaryGap: false,
        data: [],
        axisLine: { lineStyle: { color: '#3B4CCA' } },
        axisLabel: {
          color: '#ffd733',
          textStyle: { color: '#ffd733' }
        },
        splitLine: { show: false }
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: { lineStyle: { color: '#3B4CCA' } },
        axisLabel: {
          color: '#ffd733',
          textStyle: { color: '#ffd733' }
        },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
        min: 0,
        scale: true
      },
    ],
    dataZoom: [
      {
        id: "dataZoomX",
        type: "slider",
        xAxisIndex: [0],
        filterMode: "filter",
        height: 20,
        top: 35,
        fillerColor: 'rgba(255, 215, 0, 0.3)',
        handleStyle: { color: '#ffd733' },
        textStyle: { color: '#ffd733' }
      },
    ],
    series: [],
  };

  const teams = Object.keys(places);
  for (let i = 0; i < teams.length; i++) {
    const team_score = [];
    const times = [];
    for (let j = 0; j < places[teams[i]]["solves"].length; j++) {
      team_score.push(places[teams[i]]["solves"][j].value);
      const date = dayjs(places[teams[i]]["solves"][j].date);
      times.push(date.toDate());
    }

    const total_scores = cumulativeSum(team_score);
    let scores = times.map(function (e, i) {
      return [e, total_scores[i]];
    });

    option.legend.data.push(places[teams[i]]["name"]);

    const data = {
      name: places[teams[i]]["name"],
      type: "line",
      label: {
        normal: {
          position: "top",
        },
      },

      lineStyle: { width: 3 },
      symbol: 'none',
      data: scores,
    };
    option.series.push(data);
  }

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
