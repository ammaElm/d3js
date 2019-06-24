<template>
  <div class="chart">
    
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'vue-line-chart',
  data() {
    return {
      clockGroup: null,
      scaleSecs: null,
      scaleMins: null,
      scaleHours: null,
    };
  },
  mounted() {
    let fields = this.fields;
    let width, height, offSetX, offSetY, pi;
    width = 400;
    height = 200;
    offSetX = 150;
    offSetY = 100;

    pi = Math.PI;
    this.scaleSecs = d3.scaleLinear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
    this.scaleMins = d3.scaleLinear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
    this.scaleHours = d3.scaleLinear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

    let vis;
    vis = d3.selectAll(".chart")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);
    this.clockGroup = vis.append("svg:g")
      .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

    this.clockGroup.append("svg:circle")
      .attr("r", 80).attr("fill", "none")
      .attr("class", "clock outercircle")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    this.clockGroup.append("svg:circle")
      .attr("r", 4)
      .attr("fill", "black")
      .attr("class", "clock innercircle");

    setInterval(() => {
      let data;
      data = fields();
      return this.renderData(data);
    }, 1000);
  },
  methods: {
    fields() {
      let currentTime, hour, minute, second;
      currentTime = new Date();
      second = currentTime.getSeconds();
      minute = currentTime.getMinutes();
      hour = currentTime.getHours() + minute / 60;
      return [
        {
          "unit": "seconds",
          "numeric": second
        }, {
          "unit": "minutes",
          "numeric": minute
        }, {
          "unit": "hours",
          "numeric": hour
        }
      ];
    },
    renderData (data) { 
      let hourArc, minuteArc, secondArc;

      this.clockGroup.selectAll(".clockhand").remove();

      secondArc = d3.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle((d) => {
          return this.scaleSecs(d.numeric);
        })
        .endAngle((d) => {
          return this.scaleSecs(d.numeric);
        });

      minuteArc = d3.arc()
        .innerRadius(0)
        .outerRadius(70)
        .startAngle((d) => {
          return this.scaleMins(d.numeric);
        })
        .endAngle((d) => {
          return this.scaleMins(d.numeric);
        });

      hourArc = d3.arc()
        .innerRadius(0)
        .outerRadius(50)
        .startAngle((d) => {
          return this.scaleHours(d.numeric % 12);
        })
        .endAngle((d) => {
          return this.scaleHours(d.numeric % 12);
        });

      this.clockGroup.selectAll(".clockhand")
        .data(data)
        .enter()
        .append("svg:path")
        .attr("d", (d) => {
          if (d.unit === "seconds") {
            return secondArc(d);
          } else if (d.unit === "minutes") {
            return minuteArc(d);
          } else if (d.unit === "hours") {
            return hourArc(d);
          }
        })
        .attr("class", "clockhand")
        .attr("stroke", "black")
        .attr("stroke-width", (d) => {
          if (d.unit === "seconds") {
            return 2;
          } else if (d.unit === "minutes") {
            return 3;
          } else if (d.unit === "hours") {
            return 3;
          }
        })
        .attr("fill", "none");
    },
  } 

}
</script>

<style lang="less" scoped>
  svg {
    margin: 25px;
  }
    
  path {
    fill: none;
    stroke: #76BF8A;
    stroke-width: 3px;
  }   
  
</style>
<style lang="less">
.chart rect {
  fill: steelblue;
}

.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}
</style>


